"use client";
import { useEffect, useRef, useState } from "react";
import {
  useForm,
  useFormFields,
  useFormProcessing,
  useRowLabel,
} from "@payloadcms/ui";
let pendingFocus:
  { path: string; index: number; id?: string; expires: number } | undefined;
export function SectionOrderLabel() {
  const { data, path, rowNumber } = useRowLabel<{
    id?: string;
    blockType?: string;
    headline?: string;
  }>();
  const parent = path.split(".").slice(0, -1).join(".");
  const index = rowNumber ?? Number(path.split(".").at(-1));
  const count = useFormFields(([fields]) => fields[parent]?.rows?.length ?? 0);
  const { moveFieldRow } = useForm();
  const processing = useFormProcessing();
  const [announcement, setAnnouncement] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  function move(target: number) {
    if (processing || target < 0 || target >= count) return;
    pendingFocus = {
      path: parent,
      index: target,
      id: data.id,
      expires: Date.now() + 2000,
    };
    moveFieldRow({ path: parent, moveFromIndex: index, moveToIndex: target });
    setAnnouncement(`Section moved to position ${target + 1}`);
  }
  // Payload temporarily replaces labels with a loading shimmer after sorting.
  // Restore only when the moved stable row has mounted at its new position.
  useEffect(() => {
    if (pendingFocus && pendingFocus.expires < Date.now())
      pendingFocus = undefined;
    if (
      pendingFocus?.path === parent &&
      pendingFocus.index === index &&
      pendingFocus.id === data.id
    ) {
      const button = wrapperRef.current?.querySelector<HTMLButtonElement>(
        "button:not(:disabled)",
      );
      const active = document.activeElement;
      if (
        button &&
        (active === document.body ||
          active?.closest(".cms-section-order") !== null)
      ) {
        button.focus();
      }
    }
  });
  const name = (data.blockType || "Section").replace(/([A-Z])/g, " $1");
  return (
    <div ref={wrapperRef} className="cms-section-order">
      <span>
        {String(index + 1).padStart(2, "0")} {name}
      </span>
      <span className="cms-section-order__buttons">
        <button
          type="button"
          aria-label={`Move section ${index + 1} up`}
          disabled={processing || index === 0}
          onKeyDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            move(index - 1);
          }}
        >
          ↑
        </button>
        <button
          type="button"
          aria-label={`Move section ${index + 1} down`}
          disabled={processing || index + 1 >= count}
          onKeyDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            move(index + 1);
          }}
        >
          ↓
        </button>
      </span>
      <span aria-live="polite" className="cms-section-order__announcement">
        {announcement}
      </span>
    </div>
  );
}
