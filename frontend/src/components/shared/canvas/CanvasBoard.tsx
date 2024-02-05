import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const CanvasBoard = ({ canvasRef, ctxRef, setElements, elements }: any) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    ctxRef.current = context;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    elements.forEach((element: any) => {
      roughCanvas.linearPath(element.path);
    });
  }, [elements]);

  const handleMouseDown = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log(offsetX, offsetY);

    setElements((prevElements: any) => [
      ...prevElements,
      {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: "black",
        strokerWidth: 2,
      },
    ]);

    setIsDrawing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;

    const { path } = elements[elements.length - 1];
    const newPath = [...path, [offsetX, offsetY]];

    setElements((prevElements: any) => {
      return prevElements.map((element: any, index: number) => {
        if (index === prevElements.length - 1) {
          return { ...element, path: newPath };
        }
        return element;
      });
    });

    console.log(offsetX, offsetY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="col-md-8 border border-dark px-0 mx-auto mt-3 bg-white"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {JSON.stringify(elements)}
    </>
  );
};

export default CanvasBoard;
