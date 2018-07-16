import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IActor } from '../../../model/people';

@Component({
    selector: 'app-actor-details-content',
    templateUrl: './actor-details-content.component.html',
    styleUrls: ['./actor-details-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsContentComponent implements OnInit {

    @Input() actor: IActor;

    constructor() {
    }

    public ngOnInit() {
    }

}
