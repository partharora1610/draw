// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { LucidePenTool } from "lucide-react";
import { useRef, useState } from "react";
import CanvasBoard from "./CanvasBoard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LucidePenTool } from "lucide-react";

const INITIALCOLORS = ["#000000", "#000000"];

// This is the tailwind error need to be aware of this error
//bg-[#000000]

export default function Component() {
  const [preferredColor, setPrefferedColors] = useState([]);
  const [tool, setTool] = useState("");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);

  const canvasRef = useRef<string | null>(null);
  const ctxRef = useRef<string | null>(null);

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between p-4 border-b-1 border-gray-700 bg-gray-200">
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-white p-2">
                  <div onClick={() => setTool("pencil")}>
                    <PencilIcon className="h-6 w-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pencil</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-white p-2">
                  <div onClick={() => setTool("line")}>
                    <LucidePenTool />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Line</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-white p-2">
                  <div onClick={() => setTool("rect")}>
                    <ShapesIcon className="h-6 w-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shapes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-white p-2">
                  <EraserIcon className="h-6 w-6" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shapes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex gap-2">
            {INITIALCOLORS.map((color, i) => {
              const newClass = `w-[32px] h-[32px] bg-[${color}] cursor-pointer`;
              return <div key={i} className={newClass} id="#000"></div>;
            })}

            <div className="w-[75px]">
              <Input type="color" />
            </div>
          </div>
        </div>
        <div className="">
          <CanvasBoard
            canvasRef={canvasRef}
            tool={tool}
            ctx={ctxRef}
            elements={elements}
            setElements={setElements}
          />
        </div>
      </div>
    </>
  );
}

function EraserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
      <path d="M22 21H7" />
      <path d="m5 11 9 9" />
    </svg>
  );
}

function PaletteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function PencilIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function ShapesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <circle cx="17.5" cy="17.5" r="3.5" />
    </svg>
  );
}
