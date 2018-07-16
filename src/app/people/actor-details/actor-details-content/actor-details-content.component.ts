import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IActor, IMovie, ITv } from '../../../model';

@Component({
    selector: 'app-actor-details-content',
    templateUrl: './actor-details-content.component.html',
    styleUrls: ['./actor-details-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsContentComponent implements OnInit {

    @Input() actor: IActor;

    // cast movie
    public castMovieCredits: IMovie[];
    public castMovieCreditsSorted: IMovie[];
    public castMovieCreditsReleasedSorted: IMovie[];
    public castMovieCreditsReleasedFeaturedSorted: IMovie[];

    // cast tv
    public castTvCredits: ITv[];
    public castTvCreditsSorted: ITv[];
    public castTvCreditsReleasedSorted: ITv[];
    public castTvCreditsReleasedFeaturedSorted: ITv[];

    // crew movie
    public crewMovieCredits: IMovie[];
    public crewMovieCreditsSorted: IMovie[];
    public crewMovieCreditsReleasedSorted: IMovie[];
    public crewMovieCreditsReleasedFeaturedSorted: IMovie[];

    // cast tv
    public crewTvCredits: ITv[];
    public crewTvCreditsSorted: ITv[];
    public crewTvCreditsReleasedSorted: ITv[];
    public crewTvCreditsReleasedFeaturedSorted: ITv[];

    private readonly now = new Date();

    constructor() {
    }

    public ngOnInit() {
        this.initCreditArrays();
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
            .filter((obj, index, arr) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);

        // cast tv
        this.castTvCredits = this.actor.tv_credits.cast;
        this.castTvCreditsSorted = [...this.castTvCredits]
            .sort(( t1, t2 ) => this.sortFn(t1.first_air_date, t2.first_air_date));
        this.castTvCreditsReleasedSorted = [...this.castTvCreditsSorted]
            .filter(( m ) => m.first_air_date && (new Date(m.first_air_date)).getTime() < this.now.getTime());
        this.castTvCreditsReleasedFeaturedSorted = [...this.castTvCreditsReleasedSorted]
            .filter((obj, index, arr) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);

        // crew movie
        this.crewMovieCredits = this.actor.movie_credits.crew;
        this.crewMovieCreditsSorted = [...this.crewMovieCredits]
            .sort(( m1, m2 ) => this.sortFn(m1.release_date, m2.release_date));
        this.crewMovieCreditsReleasedSorted = [...this.crewMovieCreditsSorted]
            .filter(( m ) => m.release_date && (new Date(m.release_date)).getTime() < this.now.getTime());
        this.crewMovieCreditsReleasedFeaturedSorted = [...this.crewMovieCreditsReleasedSorted]
            .filter((obj, index, arr) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);

        // crew tv
        this.crewTvCredits = this.actor.tv_credits.crew;
        this.crewTvCreditsSorted = [...this.crewTvCredits]
            .sort(( t1, t2 ) => this.sortFn(t1.first_air_date, t2.first_air_date));
        this.crewTvCreditsReleasedSorted = [...this.crewTvCreditsSorted]
            .filter(( m ) => m.first_air_date && (new Date(m.first_air_date)).getTime() < this.now.getTime());
        this.crewTvCreditsReleasedFeaturedSorted = [...this.crewTvCreditsReleasedSorted]
            .filter((obj, index, arr) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === index)
            .slice(0, 8);
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
}
