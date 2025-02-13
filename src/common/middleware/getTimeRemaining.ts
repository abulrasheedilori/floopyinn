export const getTimeRemaining = (createdAt: string, expiredAt: string): string => {
  const createdDate = new Date(createdAt);
  const expiredDate = new Date(expiredAt);
  const now = new Date();

  // Ensure the date strings are valid
  if (isNaN(createdDate.getTime()) || isNaN(expiredDate.getTime())) {
    return 'Invalid date format.';
  }

  // Calculate total duration and remaining time in milliseconds
  const timeRemaining = expiredDate.getTime() - now.getTime();

  if (timeRemaining <= 0) {
    return 'The expiration date has already passed.';
  }

  // Constants for time unit conversions
  const millisecondsInASecond = 1000;
  const secondsInAMinute = 60;
  const minutesInAnHour = 60;
  const hoursInADay = 24;
  const daysInAWeek = 7;

  // Calculate remaining time in various units
  const totalSeconds = Math.floor(timeRemaining / millisecondsInASecond);
  const totalMinutes = Math.floor(totalSeconds / secondsInAMinute);
  const totalHours = Math.floor(totalMinutes / minutesInAnHour);
  const totalDays = Math.floor(totalHours / hoursInADay);
  const weeks = Math.floor(totalDays / daysInAWeek);
  const days = totalDays % daysInAWeek;
  const hours = totalHours % hoursInADay;
  const minutes = totalMinutes % minutesInAnHour;

  // Format the output string
  const timeComponents = [];
  if (weeks > 0) timeComponents.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
  if (days > 0) timeComponents.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) timeComponents.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) timeComponents.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);

  const timeLeft = timeComponents.join(', ');

  return `${timeLeft} left`;
}