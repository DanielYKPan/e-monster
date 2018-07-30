import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAlbum } from '../../model';

@Component({
    selector: 'app-album-card',
    templateUrl: './album-card.component.html',
    styleUrls: ['./album-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumCardComponent implements OnInit {

    @Input() album: IAlbum;

    @Input() featured: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
