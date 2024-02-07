import { socket } from "@/App";
import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const generator = rough.generator();
const CanvasBoard = ({
  canvasRef,
  ctx,
  color,
  setElements,
  elements,
  tool,
  user,
}: any) => {
  // if the user is not the presenter, then show the image
  const [img, setImg] = useState("");
  console.log(user);

  useEffect(() => {
    socket.on("canvasDataResponse", (data: any) => {
      console.log(data);
      setImg(data.imgUrl);
    });
  }, []);

  if (!user?.presenter) {
    return (
      <div
        className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
        style={{ height: "500px" }}
      >
        <img src={img} alt="" className="w-100 h-100" />
        {JSON.stringify(elements)}
        <p>This is coming</p>
      </div>
    );
  }

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");

    context.strokeWidth = 5;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 5;
    ctx.current = context;
  }, []);

  useEffect(() => {
    ctx.current.strokeStyle = color;
  }, [color]);

  const handleMouseDown = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements: any) => [
        ...prevElements,
        {
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
          element: tool,
        },
      ]);
    } else {
      setElements((prevElements: any) => [
        ...prevElements,
        { offsetX, offsetY, stroke: color, element: tool },
      ]);
    }

    setIsDrawing(true);
  };

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    if (elements.length > 0) {
      ctx.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    elements.forEach((ele: any, i: number) => {
      if (ele.element === "rect") {
        roughCanvas.draw(
          generator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height, {
            stroke: ele.stroke,
            roughness: 0,
            strokeWidth: 5,
          })
        );
      } else if (ele.element === "line") {
        roughCanvas.draw(
          generator.line(ele.offsetX, ele.offsetY, ele.width, ele.height, {
            stroke: ele.stroke,
            roughness: 0,
            strokeWidth: 5,
          })
        );
      } else if (ele.element === "pencil") {
        roughCanvas.linearPath(ele.path, {
          stroke: ele.stroke,
          roughness: 0,
          strokeWidth: 5,
        });
      }

      const canvasImage = canvasRef.current.toDataURL();
      socket.emit("canvas-data", canvasImage);
    });
  }, [elements]);

  const handleMouseMove = (e: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "rect") {
      setElements((prevElements: any) =>
        prevElements.map((ele: any, index: any) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    } else if (tool === "line") {
      setElements((prevElements: any) =>
        prevElements.map((ele: any, index: number) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                width: offsetX,
                height: offsetY,
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    } else if (tool === "pencil") {
      setElements((prevElements: any) =>
        prevElements.map((ele: any, index: number) =>
          index === elements.length - 1
            ? {
                offsetX: ele.offsetX,
                offsetY: ele.offsetY,
                path: [...ele.path, [offsetX, offsetY]],
                stroke: ele.stroke,
                element: ele.element,
              }
            : ele
        )
      );
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <div
        className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
        style={{ height: "500px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas ref={canvasRef} />
      </div>
      {JSON.stringify(elements)}
    </>
  );
};

export default CanvasBoard;
