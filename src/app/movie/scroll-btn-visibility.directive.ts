import {
    AfterContentInit,
    ChangeDetectorRef,
    Directive,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Renderer2
} from '@angular/core';

@Directive({
    selector: '[appScrollBtnVisibility]'
})
export class ScrollBtnVisibilityDirective implements OnInit, AfterContentInit {

    @Input() scrollTarget: HTMLElement;

    private readonly defaultOpacity = .5;

    private isOn: boolean; // whether the btn is focused or mouse entered

    private opacity: number;

    constructor( private renderer: Renderer2,
                 private cdRef: ChangeDetectorRef ) {
    }

    @HostBinding('style.opacity')
    get btnOpacity(): number {
        return this.isOn ? 1 : this.opacity;
    }

    @HostBinding('style.visibility')
    get btnVisibility(): string {
        return (this.isOn || this.opacity > 0) ? 'visible' : 'hidden';
    }

    public ngOnInit(): void {
        this.renderer.listen(this.scrollTarget, 'scroll', () => {
            this.setOpacity();
            this.cdRef.markForCheck();
        });
    }

    public ngAfterContentInit(): void {
        this.setOpacity();
    }

    @HostListener('mouseenter')
    @HostListener('focus')
    private handleMouseEnterOnHost(): void {
        this.isOn = true;
    }

    @HostListener('mouseleave')
    @HostListener('blur')
    private handleMouseLeaveOnHost(): void {
        this.isOn = false;
    }

    private setOpacity(): void {
        this.opacity = this.defaultOpacity - this.scrollTarget.scrollTop / 700;
    }
}
