import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAudio } from '../../model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-audio-card',
    templateUrl: './audio-card.component.html',
    styleUrls: ['./audio-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioCardComponent implements OnInit {

    @Input() audio: IAudio;

    @Input() scrollTarget: HTMLElement;

    @Input() scrollObservable: Observable<any>;

    @Input() cardLink: string;

    @Input() imageLink: string;

    @Input() title: string;

    @Input() date: string;

    @Input() vote_average: number;

    @Input() vote_count: number;

    @Output() addCollection = new EventEmitter<{ audio: IAudio, event: any }>();

    @Output() playVideo = new EventEmitter<{ audio: IAudio, event: any }>();

    constructor() {
    }

    ngOnInit() {
    }

    public clickAddCollection( event: any ): void {
        this.addCollection.emit({audio: this.audio, event});
        event.preventDefault();
    }

    public clickPlayVideo( event: any ): void {
        this.playVideo.emit({audio: this.audio, event});
        event.preventDefault();
    }

}
