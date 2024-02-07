import Canvas from "@/components/shared/canvas/Canvas";
import { useParams } from "react-router-dom";

const CanvasPage = () => {
  const { id } = useParams();

  return (
    <div className="border-1 border-black w-full">
      <p>ROOMID:{id}</p>

      <Canvas />
    </div>
  );
};

export default CanvasPage;
