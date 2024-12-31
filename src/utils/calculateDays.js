export const calculateDaysDifference = (deadlineDate) => {
  const now = new Date();

  if (!(deadlineDate instanceof Date) || isNaN(deadlineDate.getTime())) {
    throw new Error('Invalid future date provided');
  }

  const diffInMillis = deadlineDate.getTime() - now.getTime();
  return Math.max(0, Math.floor(diffInMillis / (1000 * 60 * 60 * 24)));
};
