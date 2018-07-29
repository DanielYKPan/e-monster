import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addCommas'
})
export class AddCommasPipe implements PipeTransform {

    transform( value: null | string[], args?: string ): string {

        if (!value) {
            return args || 'Unknown';
        }

        switch (value.length) {
            case 0:
                return args || 'Unknown';
            case 1:
                return value[0];
            case 2:
                return value.join(' and ');
            default:
                const last = value[value.length - 1];
                const remaining = value.slice(0, -1);
                return `${remaining.join(', ')}, and ${last}`;
        }
    }
}
