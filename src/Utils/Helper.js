export const getEventStatus = (startTime, endTime) => {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  if (now < start) {
    return "upcoming";
  }
  if (now >= start && now <= end) {
    return "live";
  }
  if (now > end) {
    return "closed";
  }
};
