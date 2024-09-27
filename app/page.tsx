import ReadMe from "./components/readme";
import ping from "./services/db";

export default async function Home() {
    const pingData = await ping();
      return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <ReadMe/>
              {pingData && pingData.length > 0 ? pingData.map(ping => <span>ping</span>) : "No data found"}
          </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
           Test Footer
          </footer>
        </div>
      );
}
