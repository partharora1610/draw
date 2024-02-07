export function generateRoomID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let roomID = "";
  for (let i = 0; i < 28; i++) {
    if (i === 4) {
      roomID += "-";
    } else {
      roomID += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  }
  return roomID;
}
