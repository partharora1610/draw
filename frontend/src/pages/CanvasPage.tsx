import { useParams } from "react-router-dom";

import Canvas from "@/components/shared/canvas/Canvas";

const CanvasPage = ({ user }: any) => {
  const { id } = useParams();

  return (
    <div className="border-1 border-black w-full">
      <p>ROOMID:{id}</p>

      <p>Username :{user?.name}</p>
      <p>RoomNumber:{user?.roomId}</p>

      <Canvas roomData={"roomData"} user={user} />
    </div>
  );
};

export default CanvasPage;
