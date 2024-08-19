'use client'
import { pin } from "../interfaces/db_interfaces";
import { useRouter } from 'next/navigation';

const JoinRoomModal = () => {
  const router = useRouter();
  async function validateRoom(formData: FormData){
    const pinData: pin = {
      roomPin: formData.get('roomPin') as string
    }

    const res = await fetch('/api/checkRoom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pinData),
    });

    if (res.ok){
      router.push(`/room/${pinData.roomPin}`);
    }
  }

  return (
    // Main modal
    <div id="join-room-modal" tabIndex={-1} aria-hidden="true" className='hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-zinc-300 rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Join a Room
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="join-room-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form 
          // onSubmit={onSubmit}
          action={validateRoom}
          >
            <div className="p-4 md:p-5 space-y-4">
              <div className="flex-col items-center justify-center">
                {/* <label htmlFor="room-pin" className="block text-center mb-2 text-l font-semibold text-gray-900 dark:text-white">Room Pin</label> */}
                <input type="text" id="room-pin" name="roomPin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Room Pin"/>
              </div>
            </div>
            {/* Modal footer */}
            <div className="w-full flex justify-center pb-2">
              <button type="submit" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-11/12 dark:focus:ring-gray-500 dark:hover:bg-[#050708]">
                Join!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JoinRoomModal