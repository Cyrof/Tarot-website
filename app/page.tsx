import CreateRoomBtn from "./components/createRoomBtn";
import JoinRoomModal from "./components/joinRoomModal";

export default function Home () {

  return (
    <main>
      <div className="wrapper w-full max-h-full">
        <div className="btns">
          <CreateRoomBtn/> 
          <button
          data-modal-target="join-room-modal"
          data-modal-toggle="join-room-modal"
          type="button"
          className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          >
            Join Room
          </button>
        </div>
        {/* Modal */}
        <JoinRoomModal/>
      </div>
      <script src="/scripts/flowbite.min.js"></script>
    </main>
  );
}
