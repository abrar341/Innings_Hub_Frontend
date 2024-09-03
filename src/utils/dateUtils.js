import { format } from 'date-fns';

export const formatDateToYMD = (date) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd');
};
