import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="wrapper">
        <div className="btns">
          <Link href="./room">
            <button type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              Create Room
            </button>          
          </Link>
        </div>
      </div>
    </main>
  );
}
