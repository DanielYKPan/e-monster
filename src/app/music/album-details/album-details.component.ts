import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
