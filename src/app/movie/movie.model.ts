/**
 * movie.model
 */

export interface IMovieBasic {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

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
    casts: IMovieCast[];
    crews: IMovieCrew[];
    reviews: IMovieReviews;
    external: { id: string, imdb_id: string, facebook_id: string, instagram_id: string, twitter_id: string };
    similar: IMovieBasic[];
}

export interface IMovieCast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string;
    reviews: IMovieReviews;
}

export interface IMovieCrew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path: string;
}

export interface IMovieReviews {
    page: number;
    results: Array<{ author: string, content: string, id: string, url: string }>;
    total_pages: number;
    total_results: number;
}

export interface IMovieVideo {
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}

export interface IMovieVideos {
    id: number;
    results: IMovieVideo[];
}

export interface IMovieGenre {
    id: number;
    name: string;
}

export interface ISearchStat {
    page: number;
    total_results: number;
    total_pages: number;
}
