import { IAudio } from './audio';
import { ICast } from './cast';
import { ICrew } from './crew';
import { IReviews } from './review';

export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: { id: number, name: string, poster_path: string, backdrop_path: string };
    budget: number;
    genres: Array<{ id: number, name: string }>;
    homepage: string;
    id: number;
    imdb_id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<{ id: number, logo_path: string, name: string, origin_country: string }>;
    production_countries: Array<{ iso_3166_1: string, name: string }>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<{ iso_639_1: number, name: string }>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credits: {cast: ICast[], crew: ICrew[]};
    reviews: IReviews;
    external_ids: { id: string, imdb_id: string, facebook_id: string, instagram_id: string, twitter_id: string };
    similar: {page: number, results: IAudio[], total_pages: number, total_results: number};
}
