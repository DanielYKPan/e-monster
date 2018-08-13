import { AfterContentInit, ChangeDetectorRef, Directive, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appScrollVisibility]',
    exportAs: 'scrollVisibility'
})
export class ScrollVisibilityDirective implements OnInit, AfterContentInit {

    @Input() scrollTarget: HTMLElement;

    @Input() scrollOnDistance = 200;

    public scrolled = false; // whether the scrollTarget scrolled specific distance;

    constructor( private renderer: Renderer2,
                 private cdRef: ChangeDetectorRef ) {
    }

    public ngOnInit(): void {
        this.renderer.listen(this.scrollTarget, 'scroll', ( event: any ) => {
            this.setOn();
            this.cdRef.markForCheck();
        });
    }

    public ngAfterContentInit(): void {
        this.setOn();
    }

    private setOn(): void {
        const isOn = this.scrollTarget.scrollTop > this.scrollOnDistance;

        if (this.scrolled !== isOn) {
            this.scrolled = isOn;
        }
    }
}
