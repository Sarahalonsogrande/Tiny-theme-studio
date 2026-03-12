import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreaks',
})
export class LinebreaksPipe implements PipeTransform {

  transform(value: string): string {
    // Transform \\n or \n -> <br>
    return value ? value.replace(/\\n|\\r\\n|\\r|\n/g, '<br>') : '';
  }

}
