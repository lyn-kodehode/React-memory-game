// Fisher–Yates shuffle

export const shuffle = (array) => {
  const newArray = [...array];

  // i = starts from the end of array
  for (let i = newArray.length - 1; i > 0; i--) {
    // random index 0..i(length)
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
