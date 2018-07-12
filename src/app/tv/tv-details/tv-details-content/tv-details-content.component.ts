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
import { ITv, IVideo } from '../../../model';
import { OwlDialogService } from 'owl-ng';
import * as fromTvRoot from '../../reducers';
import { Store } from '@ngrx/store';

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

    @Input() tvVideos: IVideo[];

    @Output() tvVideoClick = new EventEmitter<any>();

    @Output() tvSeasonVideoClick = new EventEmitter<any>();

    @Output() fullCastCrewClick = new EventEmitter<any>();

    public castProfileWidth = 96;

    public castListSlideDistance = 0;

    get showSlideButtons(): boolean {
        return this.castListWrapperRef &&
            this.tv.credits.cast.length * this.castProfileWidth > this.castListWrapperRef.nativeElement.offsetWidth;
    }

    constructor( private store: Store<fromTvRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    ngOnInit() {
    }

    public clickVideo( video: IVideo, event: any ): void {
        this.tvVideoClick.emit({
            title: this.tv.name,
            videoKey: video.key,
            event
        });
    }

    public clickFullCastCrew( event: any ): void {
        this.fullCastCrewClick.emit({
            tv: this.tv,
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

    public playTvSeasonVideo( res: { audio: any; event: any } ) {
        this.tvSeasonVideoClick.emit({
            tv: this.tv,
            season: res.audio,
            event: res.event
        });
    }
}
