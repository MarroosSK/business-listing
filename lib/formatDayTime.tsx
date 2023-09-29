export const getDayName = (day: number) => {
  const daysOfWeek: string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
    "Sun",
  ];
  return daysOfWeek[day];
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
