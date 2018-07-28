import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'millisToMs'
})
export class MillisToMsPipe implements PipeTransform {

    transform( value: any, args?: any ): any {
        const minutes = Math.floor(value / 60000);
        const seconds = +((value % 60000) / 1000).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
}
