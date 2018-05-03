import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-vote-inform',
    templateUrl: './vote-inform.component.html',
    styleUrls: ['./vote-inform.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteInformComponent implements OnInit {

    private _vote_average: number;
    @Input()
    get vote_average(): number {
        return this._vote_average;
    }

    set vote_average( val: number ) {
        this._vote_average = Math.round(val * 10) / 10;
    }

    @Input() vote_count = 0;

    @Input() vote_highest = 10;

    constructor() {
    }

    public ngOnInit() {
    }

}
