import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], ...args: any[]) {
    if (!data.length) return null;
    if (!args.length) return data;

    const key = (args[0] || '').toLowerCase();

    return data.filter(item => JSON.stringify(item).toLowerCase().includes(key)).slice(0, 6);
  }
}
