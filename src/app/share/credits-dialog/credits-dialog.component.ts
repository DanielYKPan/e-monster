import { AfterContentInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ICast, ICrew } from '../../model';
import { OWL_DIALOG_DATA, OwlDialogRef } from 'owl-ng';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-credits-dialog',
    templateUrl: './credits-dialog.component.html',
    styleUrls: ['./credits-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditsDialogComponent implements OnInit, AfterContentInit {

    public title: string;

    public date: string;

    public cast: ICast[];

    public crew: ICrew[];

    public imagePath: string;

    get directors(): ICrew[] {
        return this.crew.filter(( p ) => p.job === 'Director');
    }

    get exProducers(): ICrew[] {
        return this.crew.filter(( p ) => p.job === 'Executive Producer');
    }

    get producers(): ICrew[] {
        return this.crew.filter(( p ) => p.job === 'Producer');
    }

    get writers(): ICrew[] {
        return this.crew.filter(( p ) => p.department === 'Writing');
    }

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( public dialogRef: OwlDialogRef<CreditsDialogComponent>,
                 private appService: AppService,
                 @Inject(OWL_DIALOG_DATA) public data: any ) {
    }

    ngOnInit() {
    }

    public ngAfterContentInit(): void {
        this.title = this.data.title;
        this.date = this.data.date;
        this.cast = this.data.cast;
        this.crew = this.data.crew;
        this.imagePath = this.data.imagePath;
    }

    public closeDialog( event: any ): void {
        this.dialogRef.close();
        event.preventDefault();
    }

    public closeDialogWithPersonInform(people: ICast | ICrew, event: any): void {
        this.dialogRef.close({people});
        event.preventDefault();
    }
}
