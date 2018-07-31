import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-track-bar',
    templateUrl: './track-bar.component.html',
    styleUrls: ['./track-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackBarComponent implements OnInit {

    @Input() imageUrl: string;

    @Input() name: string;

    @Input() explicit: boolean;

    @Input() artists: any[];

    @Input() duration_ms: number;

    @Input() role: string;

    @Input() type: string;

    @Input() track_number: number;

    @Output() select = new EventEmitter<any>();

    @HostBinding('attr.role')
    get trackBarRole(): string {
        return this.role;
    }

    @HostBinding('attr.type')
    get trackBarType(): string {
        return this.type;
    }

    @HostBinding('attr.tabindex')
    get trackBarTabindex(): number {
        return 0;
    }

    get artistNames(): string[] {
        return this.artists ?
            this.artists.map(( artist ) => artist.name) : null;
    }

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('click', ['$event'])
    public handleClickOnHost( event: any ): void {
        this.select.emit(event);
        event.preventDefault();
        return;
    }

    @HostListener('keydown', ['$event'])
    public handleKeydownOnHost( event: KeyboardEvent ): void {
        switch (event.keyCode) {
            case ENTER:
            case SPACE:
                this.select.emit(event);
                event.preventDefault();
                return;

            default:
                return;
        }
    }
}
