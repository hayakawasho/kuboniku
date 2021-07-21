import { format } from 'date-fns';

const formatDate = (date: Date, dateformat = 'MMMM d, yyyy') => {
  return format(date, dateformat);
};

export { formatDate };
