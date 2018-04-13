import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

    transform( value: Array<any>, field?: string ): string {
        let arr = value;

        if (field) {
            arr = value.map(( v: Object ) => {
                return v[field];
            });
        }

        return arr.join(', ');
    }
}
