import { format } from 'date-fns';

export const formatDateToYMD = (date) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd');
};
export const convertTo12HourFormat = (time) => {
  // Split the time into hours and minutes
  const [hours, minutes] = time.split(':')?.map(Number);

  // Determine the period (AM/PM)
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  const adjustedHours = hours % 12 || 12; // If hours is 0 or 12, return 12

  // Return the formatted time
  return `${adjustedHours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}