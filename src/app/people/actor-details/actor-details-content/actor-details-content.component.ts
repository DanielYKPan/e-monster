import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActorDetails } from '../../../model';

@Component({
    selector: 'app-actor-details-content',
    templateUrl: './actor-details-content.component.html',
    styleUrls: ['./actor-details-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsContentComponent implements OnInit {

    @Input() actor: IActorDetails;

    @Output() showCreditOverview = new EventEmitter<any>();

    // cast movie
    public castMovieCredits: any[];
    public castMovieCreditsSorted: any[];
    public castMovieCreditsReleasedSorted: any[];
    public castMovieCreditsReleasedFeaturedSorted: any[];
    public castMovieCreditsReleasedGrouped: any[];

    // cast tv
    public castTvCredits: any[];
    public castTvCreditsSorted: any[];
    public castTvCreditsReleasedSorted: any[];
    public castTvCreditsReleasedFeaturedSorted: any[];
    public castTvCreditsReleasedGrouped: any[];

    // crew movie
    public crewMovieCredits: any[];
    public crewMovieCreditsSorted: any[];
    public crewMovieCreditsReleasedSorted: any[];
    public crewMovieCreditsReleasedFeaturedSorted: any[];
    public crewMovieCreditsReleasedGrouped: any[];

    // cast tv
    public crewTvCredits: any[];
    public crewTvCreditsSorted: any[];
    public crewTvCreditsReleasedSorted: any[];
    public crewTvCreditsReleasedFeaturedSorted: any[];
    public crewTvCreditsReleasedGrouped: any[];

    private readonly now = new Date();

    constructor() {
    }

    public ngOnInit() {
        this.initCreditArrays();
    }

    public handleCreditOverviewClick( credit: any, type: string, event: any ): void {
        this.showCreditOverview.emit({credit, type, event});
        event.preventDefault();
        return;
    }

    private initCreditArrays(): void {
        if (!this.actor) {
            return;
        }

        // cast movie
        this.castMovieCredits = this.actor.movie_credits.cast;
        this.castMovieCreditsSorted = [...this.castMovieCredits]
            .sort(( m1, m2 ) => this.sortFn(m1.release_date, m2.release_date));
        this.castMovieCreditsReleasedSorted = [...this.castMovieCreditsSorted]
            .filter(( m ) => m.release_date && (new Date(m.release_date)).getTime() < this.now.getTime());
        this.castMovieCreditsReleasedFeaturedSorted = [...this.castMovieCreditsReleasedSorted]
            .filter(( obj, index, arr ) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);
        this.castMovieCreditsReleasedGrouped = this.groupCreditsByYear(this.castMovieCreditsSorted, 'release_date');

        // cast tv
        this.castTvCredits = this.actor.tv_credits.cast;
        this.castTvCreditsSorted = [...this.castTvCredits]
            .sort(( t1, t2 ) => this.sortFn(t1.first_air_date, t2.first_air_date));
        this.castTvCreditsReleasedSorted = [...this.castTvCreditsSorted]
            .filter(( m ) => m.first_air_date && (new Date(m.first_air_date)).getTime() < this.now.getTime());
        this.castTvCreditsReleasedFeaturedSorted = [...this.castTvCreditsReleasedSorted]
            .filter(( obj, index, arr ) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);
        this.castTvCreditsReleasedGrouped = this.groupCreditsByYear(this.castTvCreditsSorted, 'first_air_date');

        // crew movie
        this.crewMovieCredits = this.actor.movie_credits.crew;
        this.crewMovieCreditsSorted = [...this.crewMovieCredits]
            .sort(( m1, m2 ) => this.sortFn(m1.release_date, m2.release_date));
        this.crewMovieCreditsReleasedSorted = [...this.crewMovieCreditsSorted]
            .filter(( m ) => m.release_date && (new Date(m.release_date)).getTime() < this.now.getTime());
        this.crewMovieCreditsReleasedFeaturedSorted = [...this.crewMovieCreditsReleasedSorted]
            .filter(( obj, index, arr ) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);
        this.crewMovieCreditsReleasedGrouped = this.groupCreditsByYear(this.crewMovieCreditsSorted, 'release_date');

        // crew tv
        this.crewTvCredits = this.actor.tv_credits.crew;
        this.crewTvCreditsSorted = [...this.crewTvCredits]
            .sort(( t1, t2 ) => this.sortFn(t1.first_air_date, t2.first_air_date));
        this.crewTvCreditsReleasedSorted = [...this.crewTvCreditsSorted]
            .filter(( m ) => m.first_air_date && (new Date(m.first_air_date)).getTime() < this.now.getTime());
        this.crewTvCreditsReleasedFeaturedSorted = [...this.crewTvCreditsReleasedSorted]
            .filter(( obj, index, arr ) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);
        this.crewTvCreditsReleasedGrouped = this.groupCreditsByYear(this.crewTvCreditsSorted, 'first_air_date');
    }

    private sortFn( date_1: string | null, date_2: string | null ): number {
        const m1_date = date_1 ?
            new Date(date_1) : null;

        const m2_date = date_2 ?
            new Date(date_2) : null;

        if (m1_date && m2_date) {
            const diff_time = m1_date.getTime() - m2_date.getTime();

            if (diff_time === 0) {
                return 0;
            } else {
                return diff_time > 0 ? -1 : 1;
            }
        } else if (m1_date && !m2_date) {
            return 1;
        } else if (!m1_date && m2_date) {
            return -1;
        } else {
            return 0;
        }
    }

    private groupCreditsByYear( arr: any[], prop: string ): any[] {
        return Object.values(arr.reduce(( r, a ) => {
            const year = a[prop] ? (new Date(a[prop])).getFullYear() : '--';
            r[year] = r[year] || [];
            r[year].push(a);
            return r;
        }, Object.create(null))).reverse();
    }
}
