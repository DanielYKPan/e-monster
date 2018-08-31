/**
 * app.service
 */

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private _appContainer: HTMLElement;
    get appContainer(): HTMLElement {
        return this._appContainer;
    }

    constructor() {
    }

    public registerAppContainer(elm: HTMLElement): void {
        this._appContainer = elm;
    }

    /**
     * Set appContainer scroll position back to 0.
     * @param {boolean} smooth -- whether the scroll action should be smooth;
     * */
    public scrollBackToTop(smooth: boolean): void {
        this._appContainer
            .scroll({top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto'});
    }
}

