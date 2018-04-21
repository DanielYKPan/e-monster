/**
 * tv
 */
import { ICrew } from './crew';
import { IGenre } from './genre';
import { ICast } from './cast';
import { IReviews } from './review';

export interface ITv {
    backdrop_path: string;
    created_by: ICrew[];
    episode_run_time: number[];
    first_air_date: string[];
    genres: IGenre[];
    homepage: string[];
    id: number;
    in_production: number;
    languages: string[];
    last_air_date: string[];
    name: string;
    networks: Array<{ name: string, id: number, logo_path: string, origin_country: string }>;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    origin_language: string;
    original_name: string;
    overview: string;
    popularity: string;
    poster_path: string;
    production_companies: Array<{ id: number, name: string, logo_path: string, origin_country: string }>;
    seasons: Array<{
        air_date: string,
        episode_count: number,
        id: number,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number
    }>;
    status: string;
    type: string;
    vote_average: number;
    vote_count: number;
    external_ids: { id: string, imdb_id: string, facebook_id: string, instagram_id: string, twitter_id: string };
    credits: { cast: ICast[], crew: ICrew[] };
    reviews: IReviews;
}

export interface ISeason {
    _id: string;
    air_date: string;
    episodes: IEpisode[];
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
    external_ids: { id: string, imdb_id: string, facebook_id: string, instagram_id: string, twitter_id: string };
    credits: { cast: ICast[], crew: ICrew[] };
}

export interface IEpisode {
    air_date: string;
    crew: ICrew[];
    episode_number: number;
    guest_stars: ICast[];
    name: string;
    overview: string;
    id: number;
    production_code: string;
    season_number: number;
    still_path: number;
    vote_average: number;
    vote_count: number;
}
