// Grab every .png file in src/assets/cards and subfolders
const modules = import.meta.glob("../assets/cards/**/*.png", { eager: true });
// should log an object of file paths -> module objects
// console.log("modules:", modules);
// console.log("modules keys:", Object.keys(modules));

// URLs of all pngs
// Convert object of modules into an array of image URLs
const allImages = Object.values(modules).map((m) => m.default || m);

// Filter to only standard suits (ignore back or extras)
// const cardImages = allCards.filter(
//   (img) =>
//     img.includes("spade") ||
//     img.includes("heart") ||
//     img.includes("diamond") ||
//     img.includes("club")
// );
// should log array of URLs
// console.log("cardImages:", cardImages);

// export default cardImages;

// Filter to only standard suits (ignore back or extras)
export const faceCards = allImages.filter((img) => !img.includes("back"));
export const backCards = allImages.filter((img) => img.includes("back"));
