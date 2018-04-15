import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yearString'
})
export class YearStringPipe implements PipeTransform {

    transform( value: string, args?: any ): any {
        return value.slice(0, 4);
    }

}
