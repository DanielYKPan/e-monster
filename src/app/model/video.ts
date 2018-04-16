/**
 * video
 */

export interface IVideo {
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}

export interface IVideos {
    id: number;
    results: IVideo[];
}
