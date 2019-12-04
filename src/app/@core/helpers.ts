export function merge(obj1: any, obj2: any): any {
  let result: {};
  result = {};
  let i;
  for (i in obj1) {
    if (obj1.hasOwnProperty(i)) {
      if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
        result[i] = merge(obj1[i], obj2[i]);
      } else {
        result[i] = obj1[i];
      }
    }
  }
  let idx;
  for (idx in obj2) {
    if (obj2.hasOwnProperty(idx)) {
      if (idx in result) {
        continue;
      }
      result[idx] = obj2[idx];
    }
  }
  return result;
}

export function joinUrl(baseUrl: string, url: any) {
  if (/^(?:[a-z]+:)?\/\//i.test(url)) {
    return url;
  }

  let joined: string;
  joined = [baseUrl, url].join('/');

  let normalize: (str: any) => any;
  normalize = function (str: any) {
    return str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/\#/g, '#').replace(/\:\//g, '://');
  };

  return normalize(joined);
}

export function getFirstError(errors: any) {
  const keys = Object.keys(errors);
  return keys.length ? (errors['message'] ? errors['message'] : null) : null;
}

export function formatMoney(amount, decimalCount = 0, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    const i: any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    const j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
  } catch (e) {
    return 'Syntax error';
  }
}

export function generateDates() {
  const years = [];
  const cYear = (new Date).getFullYear();
  for (let i = cYear - 10; i <= cYear; i++)
    years.push(i);

  return years;
}

export function lt(text: string, limit: number) {
  return text.length > limit ? `${text.substr(0, limit)}...` : text;
}

export function ucfirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
