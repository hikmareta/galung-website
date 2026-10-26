import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";
type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};
export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams });
export default async function Page({ params, searchParams }: Args) {
  const { segments } = await params;
  if (segments?.[0] === "create-first-user") {
    return (
      <main>
        <h1>Operator setup required</h1>
        <p>
          Create the first administrator with the local admin:create command.
          Public registration is disabled.
        </p>
      </main>
    );
  }
  return RootPage({ config, params, searchParams, importMap });
}
