import { AfterContentInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { OWL_DIALOG_DATA, OwlDialogRef } from 'owl-ng';

@Component({
    selector: 'app-credit-overview-dialog',
    templateUrl: './credit-overview-dialog.component.html',
    styleUrls: ['./credit-overview-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditOverviewDialogComponent implements OnInit, AfterContentInit {

    public type: string;
    public credit: any;

    get vote_average(): number {
        return Math.round(this.credit.vote_average * 10) / 10;
    }

    constructor( public dialogRef: OwlDialogRef<CreditOverviewDialogComponent>,
                 @Inject(OWL_DIALOG_DATA) public data: any ) {
    }

    ngOnInit() {
    }

    public ngAfterContentInit(): void {
        this.type = this.data.type;
        this.credit = this.data.credit;
    }

    public closeDialog( event: any ): void {
        this.dialogRef.close();
        event.preventDefault();
    }

    public goToDetailsPage( event: any ): void {
        this.dialogRef.close({credit: this.credit, type: this.type});
        event.preventDefault();
    }
}
