"use client";
import { useDocumentInfo } from "@payloadcms/ui";
import { useRef, useState } from "react";
export function InstallerUpload() {
  const { id } = useDocumentInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const runningRef = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [os, setOS] = useState("windows");
  const [architecture, setArchitecture] = useState("");
  const [sha256, setSha256] = useState("");
  const [session, setSession] = useState<{
    id: number;
    partSize: number;
    nextPart: number;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(
    "Save a release draft before uploading. Architecture must match the approved build configuration.",
  );
  async function call(body: object) {
    const response = await fetch("/api/installers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) {
      if (result.code === "expired") {
        setSession(null);
        setProgress(0);
      }
      throw new Error(result.error || "Upload request failed");
    }
    return result;
  }
  async function upload() {
    if (!file || !id || runningRef.current) return;
    runningRef.current = true;
    setBusy(true);
    setMessage("Uploading directly to storage…");
    try {
      let current = session;
      if (current) {
        const state = await call({ action: "status", id: current.id });
        if (["uploaded", "verified"].includes(state.status)) {
          finish();
          return;
        }
        if (["aborted", "failed"].includes(state.status)) {
          setSession(null);
          setProgress(0);
          throw new Error("Previous upload ended. Start a replacement upload.");
        }
      }
      if (!current)
        current = {
          ...(await call({
            action: "begin",
            release: Number(id),
            os,
            architecture,
            filename: file.name,
            sizeBytes: file.size,
            sha256,
          })),
          nextPart: 1,
        };
      if (!current) throw new Error("Upload session unavailable; retry.");
      setSession(current);
      const count = Math.ceil(file.size / current.partSize);
      for (let part = current.nextPart; part <= count; part++) {
        const { url } = await call({ action: "part", id: current.id, part });
        const response = await fetch(url, {
          method: "PUT",
          body: file.slice(
            (part - 1) * current.partSize,
            part * current.partSize,
          ),
        });
        if (!response.ok)
          throw new Error(
            "Storage rejected a part. Retry within one hour, or cancel and start a replacement.",
          );
        setProgress(Math.round((part / count) * 100));
        current = { ...current, nextPart: part + 1 };
        setSession(current);
      }
      await call({ action: "complete", id: current.id });
      finish();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Upload failed. Retry or cancel.",
      );
    } finally {
      runningRef.current = false;
      setBusy(false);
    }
  }
  function finish() {
    setSession(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setMessage(
      "Upload complete. Verification is pending: run the installer verification worker, then inspect Release Assets before publishing.",
    );
  }
  async function cancel() {
    if (!session || runningRef.current) return;
    runningRef.current = true;
    setBusy(true);
    try {
      const state = await call({ action: "status", id: session.id });
      if (["uploaded", "verified"].includes(state.status)) {
        finish();
        return;
      }
      if (["aborted", "failed"].includes(state.status)) {
        setSession(null);
        setProgress(0);
        setMessage("Previous upload ended. Select a replacement to continue.");
        return;
      }
      await call({ action: "abort", id: session.id });
      setSession(null);
      setProgress(0);
      setMessage("Upload cancelled. Select a replacement to continue.");
    } catch {
      setMessage(
        "Cancellation failed. Retry cancellation; expired parts also require storage lifecycle cleanup.",
      );
    } finally {
      runningRef.current = false;
      setBusy(false);
    }
  }
  return (
    <section
      style={{
        border: "1px solid var(--theme-elevation-200)",
        padding: "1rem",
        marginBottom: "2rem",
      }}
      aria-label="Installer upload"
    >
      <h3>Upload installer</h3>
      <p>
        Administrator interface sample — unreviewed. No installer bytes are sent
        to the app.
      </p>
      <fieldset
        disabled={busy || !!session}
        style={{ display: "grid", gap: "1rem" }}
      >
        <legend>Installer details</legend>
        <label>
          Operating system{" "}
          <select value={os} onChange={(event) => setOS(event.target.value)}>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
          </select>
        </label>
        <label>
          Approved architecture{" "}
          <input
            value={architecture}
            onChange={(event) => setArchitecture(event.target.value)}
          />
        </label>
        <label>
          Expected SHA-256 from build output{" "}
          <input
            value={sha256}
            onChange={(event) => setSha256(event.target.value.trim())}
            pattern="[a-f0-9]{64}"
          />
        </label>
        <label>
          Installer file{" "}
          <input
            type="file"
            ref={fileInputRef}
            accept=".exe,.msi,.dmg,.pkg"
            onChange={(event) => {
              setFile(event.target.files?.[0] || null);
              setProgress(0);
            }}
          />
        </label>
      </fieldset>
      <progress
        value={progress}
        max={100}
        aria-label="Installer upload progress"
      />
      <p role="status" aria-live="polite">
        {message}
      </p>
      <button
        type="button"
        disabled={
          busy ||
          !id ||
          !file ||
          !architecture ||
          !/^[a-f0-9]{64}$/.test(sha256)
        }
        onClick={upload}
      >
        {busy
          ? "Uploading…"
          : session
            ? "Retry upload"
            : "Upload directly to storage"}
      </button>{" "}
      {session && (
        <button type="button" disabled={busy} onClick={cancel}>
          Cancel pending upload
        </button>
      )}
    </section>
  );
}
