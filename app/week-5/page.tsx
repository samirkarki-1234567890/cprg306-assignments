import ItemList from "./item-list";

export default function Week5Page() {
  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <h1 className="mx-auto max-w-xl bg-slate-700 text-slate-100 px-6 py-4 rounded-md text-center">Week 5 — New Item</h1>
      <div className="mt-10">
        <ItemList />
      </div>
    </main>
  );
}
