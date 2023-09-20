import dayjs from 'dayjs';
import jalaliDay from 'jalaliday';


dayjs.extend(jalaliDay);


export function formatDate(timestamp, format = 'YYYY/MM/DD HH:mm', calendar = 'gregori', locale = 'en', timestampFormat) {
  return dayjs(timestamp, timestampFormat).calendar(calendar).locale(locale).format(format);
}

export function dateToTimestamp(date, format) {
  return dayjs(date, format).valueOf();
}
