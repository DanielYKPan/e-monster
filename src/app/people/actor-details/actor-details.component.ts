import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
