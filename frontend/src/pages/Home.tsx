import { CreateRoomForm } from "@/components/shared/forms/CreateRoomForm";
import { JoinRoomForm } from "@/components/shared/forms/JoinRoomForm";

export default function Home({ socket, setUser, user }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 m-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Join Room
        </h2>
        <div className="mt-6">
          <JoinRoomForm socket={socket} setUser={setUser} />
        </div>
      </div>
      <div className="w-full max-w-md p-6 m-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create Room
        </h2>
        <div className="mt-6">
          <CreateRoomForm socket={socket} setUser={setUser} user={user} />
        </div>
      </div>
    </div>
  );
}
