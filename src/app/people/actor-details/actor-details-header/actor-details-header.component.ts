import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IActor } from '../../../model/people';

@Component({
    selector: 'app-actor-details-header',
    templateUrl: './actor-details-header.component.html',
    styleUrls: ['./actor-details-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsHeaderComponent implements OnInit {

    @Input() actor: IActor;

    get actorCastBackdropPath(): string {
        const credits = [...this.actor.movie_credits.cast, ...this.actor.tv_credits.cast];
        if (credits && credits.length > 0) {
            const random = credits[Math.floor(Math.random() * credits.length)];
            if (random.backdrop_path) {
                return random.backdrop_path;
            } else {
                for (const credit of credits) {
                    if (credit.backdrop_path) {
                        return credit.backdrop_path;
                    }
                }
                return null;
            }
        } else {
            return null;
        }
    }

    get actorCrewBackdropPath(): string {
        const credits = [...this.actor.movie_credits.crew, ...this.actor.tv_credits.crew];
        if (credits && credits.length > 0) {
            const random = credits[Math.floor(Math.random() * credits.length)];
            if (random.backdrop_path) {
                return random.backdrop_path;
            } else {
                for (const credit of credits) {
                    if (credit.backdrop_path) {
                        return credit.backdrop_path;
                    }
                }
                return null;
            }
        } else {
            return null;
        }
    }

    get actorBackdropPath(): string {
        return this.actorCastBackdropPath || this.actorCrewBackdropPath;
    }

    constructor() {
    }

    public ngOnInit() {
    }

}
