import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        CPRG 306: Web Development 2
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        
        <Link href="/week-2">
          <button className="w-full py-6 bg-slate-700 rounded-xl text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg">
            Week 2
          </button>
        </Link>

        <Link href="/week-3">
          <button className="w-full py-6 bg-slate-700 rounded-xl text-lg font-medium hover:bg-green-600 transition duration-300 shadow-lg">
            Week 3
          </button>
        </Link>

        <Link href="/week-4">
          <button className="w-full py-6 bg-slate-700 rounded-xl text-lg font-medium hover:bg-purple-600 transition duration-300 shadow-lg">
            Week 4
          </button>
        </Link>

        <Link href="/week-5">
          <button className="w-full py-6 bg-slate-700 rounded-xl text-lg font-medium hover:bg-pink-600 transition duration-300 shadow-lg">
            Week 5
          </button>
        </Link>

        <Link href="/week-6">
          <button className="w-full py-6 bg-slate-700 rounded-xl text-lg font-medium hover:bg-orange-600 transition duration-300 shadow-lg">
            Week 6
          </button>
        </Link>

      </div>
    </main>
  );
}