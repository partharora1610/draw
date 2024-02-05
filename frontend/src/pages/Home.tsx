import { CreateRoomForm } from "@/components/shared/forms/CreateRoomForm";
import { JoinRoomForm } from "@/components/shared/forms/JoinRoomForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 m-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Join Room
        </h2>
        <div className="mt-6">
          <JoinRoomForm />
        </div>
      </div>
      <div className="w-full max-w-md p-6 m-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create Room
        </h2>
        <div className="mt-6">
          <CreateRoomForm />
        </div>
      </div>
    </div>
  );
}
