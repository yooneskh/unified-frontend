import { format as tempoFormat, parse } from '@formkit/tempo';


export function formatDate(timestamp, format = 'YYYY/MM/DD HH:mm', locale = 'en-US', timestampFormat) {

  if (!timestampFormat) {
    return tempoFormat(new Date(Number(timestamp)), format, locale);
  }
  else {
    try {
      return tempoFormat(
        parse(timestamp, timestampFormat, locale),
        format,
        locale,
      );
    }
    catch {
      return '---';
    }
  }

}

export function parseDate(date, format, locale = 'en-US') {
  try {
    return parse(date, format, locale).valueOf();
  }
  catch {
    return 0;
  }
}
