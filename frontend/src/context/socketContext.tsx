// import React, { createContext, useContext, useEffect, useState } from "react";
// import io, { Socket } from "socket.io-client";

// interface SocketContextType {
//   socket: Socket | null;
//   roomData: any;
// }

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
//   roomData: null,
// });

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

// interface SocketProviderProps {
//   url: string;
//   children: React.ReactNode;
// }

// export const SocketProvider: React.FC<SocketProviderProps> = ({
//   url,
//   children,
// }) => {
//   const [roomData, setRoomData] = useState<any>(null);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io(url);
//     setSocket(socketInstance);

//     socketInstance.on("userJoined", (data: any) => {
//       console.log("from the server to the cli4nt", data);
//       setRoomData(data);
//     });

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [url]);

//   return (
//     <SocketContext.Provider value={{ socket, roomData }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
