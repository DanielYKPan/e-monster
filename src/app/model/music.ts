/**
 * music
 */

export interface IAlbum {
    album_type: string;
    artists: any[];
    available_markets: string[];
    copyrights: any[];
    external_urls: any;
    href: string;
    id: string;
    images: any[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    tracks:  ITrack[];
    total_tracks: number;
    uri: string;
}

export interface ITrack {
    album: IAlbum;
    artists: any[];
    disc_number: number;
    durations_ms: number;
    explicit: boolean;
    external_urls: any;
    href: string;
    id: string;
    name: string;
    popularity: number;
    track_number: number;
    type: string;
    uri: string;
}
