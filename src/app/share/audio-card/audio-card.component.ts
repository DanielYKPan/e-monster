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

    @Input() imageType: 'backdrop' | 'poster' = 'backdrop';

    @Input() showTitle = true;

    @Input() scrollTarget: HTMLElement;

    @Input() scrollObservable: Observable<any>;

    @Input() cardLink: string;

    @Output() addCollection = new EventEmitter<{ audio: IAudio, event: any }>();

    @Output() playVideo = new EventEmitter<{ audio: IAudio, event: any }>();

    get image(): string {
        return this.imageType === 'backdrop' ?
            this.audio.backdrop_path : this.audio.poster_path;
    }

    get title(): string {
        return this.audio.title || this.audio.name;
    }

    get date(): string {
        return this.audio.release_date || this.audio.first_air_date;
    }

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
