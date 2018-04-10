/**
 * movie.model
 */

export interface IMovie {
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
