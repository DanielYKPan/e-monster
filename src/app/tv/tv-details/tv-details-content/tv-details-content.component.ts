import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ITv } from '../../../model';

@Component({
    selector: 'app-tv-details-content',
    templateUrl: './tv-details-content.component.html',
    styleUrls: ['./tv-details-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvDetailsContentComponent implements OnInit {

    @ViewChild('castList') castListRef: ElementRef;

    @ViewChild('castListWrapper') castListWrapperRef: ElementRef;

    @Input() tv: ITv;

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
