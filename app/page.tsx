import Link from "next/link";
import CreateRoomBtn from "./components/createRoomBtn";

export default function Home() {
  return (
    <main>
      <div className="wrapper">
        <div className="btns">
          <Link href="./room">
            <CreateRoomBtn/> 
          </Link>
        </div>
      </div>
    </main>
  );
}
