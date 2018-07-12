import {
    ChangeDetectionStrategy,
    Component,
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

    @Input() frameMainElm: HTMLElement;

    @Output() addCollection = new EventEmitter<{ audio: IAudio, event: any }>();

    @Output() playVideo = new EventEmitter<{ audio: IAudio, event: any }>();

    constructor() {
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
        this.frameMainElm.scroll({top: 0, behavior: 'smooth'});
    }
}
