import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { IAudio } from '../../../model';

@Component({
    selector: 'app-tv-list-content',
    templateUrl: './tv-list-content.component.html',
    styleUrls: ['./tv-list-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvListContentComponent implements OnInit, OnChanges {

    @Input() featuredList: IAudio[];

    @Input() list: IAudio[];

    @Output() addCollection = new EventEmitter<{ audio: IAudio, event: any }>();

    @Output() playVideo = new EventEmitter<{ audio: IAudio, event: any }>();

    get hostElm(): HTMLElement {
        return this.elmRef.nativeElement;
    }

    constructor( private elmRef: ElementRef ) {
    }

    public ngOnInit() {
    }

    public ngOnChanges( changes: SimpleChanges ): void {
        if ((changes['list'] && !changes['list'].isFirstChange()) ||
            (changes['featuredList'] && !changes['featuredList'].isFirstChange())) {
            this.scrollBackToTop();
        }
    }

    private scrollBackToTop(): void {
        this.elmRef.nativeElement.scroll({top: 0, behavior: 'smooth'});
    }
}
