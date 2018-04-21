import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ISeason, ITv } from '../../../model';

@Component({
    selector: 'app-tv-season-details-content',
    templateUrl: './tv-season-details-content.component.html',
    styleUrls: ['./tv-season-details-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeasonDetailsContentComponent implements OnInit {

    @ViewChild('castList') castListRef: ElementRef;

    @ViewChild('castListWrapper') castListWrapperRef: ElementRef;

    @Input() tv: ITv;

    @Input() season: ISeason;

    @Output() fullCastCrewClick = new EventEmitter<any>();

    public castProfileWidth = 96;

    public castListSlideDistance = 0;

    get showSlideButtons(): boolean {
        return this.castListWrapperRef &&
            this.tv.credits.cast.length * this.castProfileWidth > this.castListWrapperRef.nativeElement.offsetWidth;
    }

    constructor() {
    }

    ngOnInit() {
    }

    public clickFullCastCrew( event: any ): void {
        this.fullCastCrewClick.emit({
            tv: this.tv,
            tvSeason: this.season,
            event
        });
    }

    public slideLeftCastList( event: any ): void {
        if (this.castListSlideDistance > 0) {
            const slideDistance = this.castProfileWidth * 2;
            this.castListSlideDistance -= this.castListSlideDistance > slideDistance ?
                slideDistance : this.castListSlideDistance;
        }
        event.preventDefault();
    }

    public slideRightCastList( event: any ): void {
        const slideDistance = this.castProfileWidth * 2;
        const listWidth = this.castListRef.nativeElement.offsetWidth;
        const listWrapperWidth = this.castListWrapperRef.nativeElement.offsetWidth;
        const remainDistance = listWidth - listWrapperWidth - this.castListSlideDistance;

        if (remainDistance > 0) {
            this.castListSlideDistance += remainDistance > slideDistance ?
                slideDistance : remainDistance;
        }
        event.preventDefault();
    }

}
