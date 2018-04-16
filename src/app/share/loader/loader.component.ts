import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {

    @Input() show = false;

    @HostBinding('class.show')
    get loaderShowClass(): boolean {
        return this.show;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
