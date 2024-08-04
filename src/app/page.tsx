export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">
        The First Descendant Item Manager
      </h1>
      <p>
        TFDIM is a tool that allows you to view your{" "}
        <span className="font-bold italic">The First Descendant Game</span>{" "}
        account and items. We&apos;ll be adding more features over time.
      </p>
      <p>Choose an option from the menu to get started.</p>
    </div>
  );
}
