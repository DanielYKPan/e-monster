/**
 * people
 */
import { IAlbum, ITrack } from './music';

export interface IActorDetails {
    adult: boolean;
    also_known_as: any[];
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: number;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    movie_credits: {
        cast: any[],
        crew: any[]
    };
    tv_credits: {
        cast: any[],
        crew: any[]
    };
    external_ids: {
        id: string,
        imdb_id: string,
        facebook_id: string,
        instagram_id: string,
        twitter_id: string
    };
}

export interface IActor {
    adult: boolean;
    id: number;
    known_for: Array<{
        adult: boolean,
        backdrop_path: string,
        first_air_date: string,
        genre_ids: number[],
        id: number,
        media_type: 'movie' | 'tv',
        name: string,
        original_country: string,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string | null,
        release_date: string,
        title: string,
        video: boolean,
        vote_count: number,
        vote_average: number,
    }>;
    name: string;
    popularity: number;
    profile_path: string;
}

export interface IArtistDetails {
    albums: IAlbum[];
    external_urls: any;
    followers: any;
    genres: string[];
    href: string;
    id: string;
    images: any[];
    name: string;
    popularity: number;
    singles: IAlbum[];
    top_tracks: ITrack[];
    type: string;
    uri: string;
}

export interface IArtist {
    id: string;
    images: any[];
    name: string;
}
