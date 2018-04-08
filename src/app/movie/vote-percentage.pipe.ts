import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'votePercentage'
})
export class VotePercentagePipe implements PipeTransform {

    transform( value: number, args?: any ): string {
        const percentage = value * 10;
        return percentage + '%';
    }
}
