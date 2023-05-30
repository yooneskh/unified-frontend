import dayjs from 'dayjs';
import jalaliDay from 'jalaliday';


dayjs.extend(jalaliDay);


export function formatDate(timestamp, format = 'YYYY/MM/DD HH:mm', calendar = 'gregori', locale = 'en') {
  return dayjs(timestamp).calendar(calendar).locale(locale).format(format);
}
