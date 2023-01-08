export const breakLinesEJS = (nameLength: number, generateNames: string[]) => {
  let interval: number;
  nameLength <= 10 ? (interval = 5) : (interval = 4);
  const word = '\n';
  return generateNames.flatMap((w: string, i: number) =>
    (i + 1) % interval === 0 ? [w, word] : w
  );
};
