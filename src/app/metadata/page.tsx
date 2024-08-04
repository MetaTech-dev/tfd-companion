import Link from "next/link";

export default function MetadataPage() {
  return (
    <main className="flex flex-col items-center container overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Metadata</h1>
      <Link href="/metadata/descendant" className="text-sm font-medium ">
        Descendant
      </Link>
    </main>
  );
}
