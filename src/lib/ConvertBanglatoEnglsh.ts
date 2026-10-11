const convertToBanglaNumber = (number: number | string): string => {
  const englishToBanglaMap: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return number
    ?.toString()
    ?.split("")
    ?.map((digit) => englishToBanglaMap[digit] || digit) // Indexing is now safe
    ?.join("");
};
const convertTimeToBangla = (time: string): string => {
  const [hour, minute] = time.split("-"); // Split hour and minute

  // Convert hour and minute to Bangla
  const formattedHour = convertToBanglaNumber(hour);
  const formattedMinute = convertToBanglaNumber(minute);

  return `${formattedHour} - ${formattedMinute}`;
};
const convertToBengaliNumber = (number: any) => {
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bengaliNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return number
    ?.toString()
    ?.split("")
    ?.map((char: any) => {
      const index = englishNumbers.indexOf(char);
      return index !== -1 ? bengaliNumbers[index] : char;
    })
    .join("");
};
export { convertToBanglaNumber, convertTimeToBangla, convertToBengaliNumber };
