import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromMusicRoot from '../reducers';
import { IAlbum } from '../../model';

@Component({
    selector: 'app-music-list',
    templateUrl: './music-list.component.html',
    styleUrls: ['./music-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicListComponent implements OnInit, AfterContentInit, OnDestroy {

    public list$: Observable<IAlbum[]>;

    public featuredList$: Observable<IAlbum[]>;

    public listQuery$: Observable<string>; // list query

    public listPage$: Observable<number>; // list page

    public listTotalPages$: Observable<number>; // list total pages

    private scrollBackTopSub = Subscription.EMPTY;

    public fullList = [
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4xRYI6VqpkE3UwrDrAZL8L"
                },
                "href": "https://api.spotify.com/v1/artists/4xRYI6VqpkE3UwrDrAZL8L",
                "id": "4xRYI6VqpkE3UwrDrAZL8L",
                "name": "Logic",
                "type": "artist",
                "uri": "spotify:artist:4xRYI6VqpkE3UwrDrAZL8L"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/0PypWtpDDSDP0IEg7LuoIw"
            },
            "href": "https://api.spotify.com/v1/albums/0PypWtpDDSDP0IEg7LuoIw",
            "id": "0PypWtpDDSDP0IEg7LuoIw",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/71b947d97f0e0b472f59f6963a2b6b39e7d50ac2",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/98850f970317b1b15f666dd49a8c166ca73c0632",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/422964643d7a6bdcafcd2e5070b904345ece9d16",
                "width": 64
            }],
            "name": "One Day (feat. Ryan Tedder)",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:0PypWtpDDSDP0IEg7LuoIw"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4Cqia9vrAbm7ANXbJGXsTE"
                },
                "href": "https://api.spotify.com/v1/artists/4Cqia9vrAbm7ANXbJGXsTE",
                "id": "4Cqia9vrAbm7ANXbJGXsTE",
                "name": "Slash",
                "type": "artist",
                "uri": "spotify:artist:4Cqia9vrAbm7ANXbJGXsTE"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1J0FSEQhWSMHcYqaapIjY6"
                },
                "href": "https://api.spotify.com/v1/artists/1J0FSEQhWSMHcYqaapIjY6",
                "id": "1J0FSEQhWSMHcYqaapIjY6",
                "name": "Myles Kennedy And The Conspirators",
                "type": "artist",
                "uri": "spotify:artist:1J0FSEQhWSMHcYqaapIjY6"
            }],
            "available_markets": [],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/7uonTXm4WR3QXhlpKi4Zv9"
            },
            "href": "https://api.spotify.com/v1/albums/7uonTXm4WR3QXhlpKi4Zv9",
            "id": "7uonTXm4WR3QXhlpKi4Zv9",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/f7802a5377d71600ad26593454c6edd3e6177c26",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/763647653a0319e1af8d31b754549d3abe0dbe06",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/2ddc30e7d50e6dd3f12b00cb6d155ab3d6b0ed9a",
                "width": 64
            }],
            "name": "Driving Rain (feat. Myles Kennedy & The Conspirators)",
            "release_date": "2018-07-25",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:7uonTXm4WR3QXhlpKi4Zv9"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1rSGNXhhYuWoq9BEz5DZGO"
                },
                "href": "https://api.spotify.com/v1/artists/1rSGNXhhYuWoq9BEz5DZGO",
                "id": "1rSGNXhhYuWoq9BEz5DZGO",
                "name": "ARTY",
                "type": "artist",
                "uri": "spotify:artist:1rSGNXhhYuWoq9BEz5DZGO"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/3iRAS0SJciT6qVEBUhtRLx"
            },
            "href": "https://api.spotify.com/v1/albums/3iRAS0SJciT6qVEBUhtRLx",
            "id": "3iRAS0SJciT6qVEBUhtRLx",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/ffc3305c1fd67c03160d87814ce594fce6d40b33",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/162109354cbd160820063df0c6eab149cff571c4",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/3b20919b5d197f9e03c6e162405b6ec4e2973bc8",
                "width": 64
            }],
            "name": "Tim",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:3iRAS0SJciT6qVEBUhtRLx"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1Cs0zKBU1kc0i8ypK3B9ai"
                },
                "href": "https://api.spotify.com/v1/artists/1Cs0zKBU1kc0i8ypK3B9ai",
                "id": "1Cs0zKBU1kc0i8ypK3B9ai",
                "name": "David Guetta",
                "type": "artist",
                "uri": "spotify:artist:1Cs0zKBU1kc0i8ypK3B9ai"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1zNqDE7qDGCsyzJwohVaoX"
                },
                "href": "https://api.spotify.com/v1/artists/1zNqDE7qDGCsyzJwohVaoX",
                "id": "1zNqDE7qDGCsyzJwohVaoX",
                "name": "Anne-Marie",
                "type": "artist",
                "uri": "spotify:artist:1zNqDE7qDGCsyzJwohVaoX"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4sqrDaJcbCIo6aeqO26maj"
            },
            "href": "https://api.spotify.com/v1/albums/4sqrDaJcbCIo6aeqO26maj",
            "id": "4sqrDaJcbCIo6aeqO26maj",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/0927ad8e0dd4608b21c083f446ef1b5cf599a8c0",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/f50acbd834d2403157d28f5bf295eb49d663e33b",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/522f5b53f20d941dfa1851f896f454f1f9bb3ac9",
                "width": 64
            }],
            "name": "Don't Leave Me Alone (feat. Anne-Marie)",
            "release_date": "2018-07-26",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:4sqrDaJcbCIo6aeqO26maj"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7gZfnEnfiaHzxARJ2LeXrf"
                },
                "href": "https://api.spotify.com/v1/artists/7gZfnEnfiaHzxARJ2LeXrf",
                "id": "7gZfnEnfiaHzxARJ2LeXrf",
                "name": "6ix9ine",
                "type": "artist",
                "uri": "spotify:artist:7gZfnEnfiaHzxARJ2LeXrf"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0hCNtLu0JehylgoiP8L4Gh"
                },
                "href": "https://api.spotify.com/v1/artists/0hCNtLu0JehylgoiP8L4Gh",
                "id": "0hCNtLu0JehylgoiP8L4Gh",
                "name": "Nicki Minaj",
                "type": "artist",
                "uri": "spotify:artist:0hCNtLu0JehylgoiP8L4Gh"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3CbYyyd8wH3RT6t0jwpdzC"
                },
                "href": "https://api.spotify.com/v1/artists/3CbYyyd8wH3RT6t0jwpdzC",
                "id": "3CbYyyd8wH3RT6t0jwpdzC",
                "name": "Murda Beatz",
                "type": "artist",
                "uri": "spotify:artist:3CbYyyd8wH3RT6t0jwpdzC"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/0gjZidNFs7O2qqE2Z5elJ3"
            },
            "href": "https://api.spotify.com/v1/albums/0gjZidNFs7O2qqE2Z5elJ3",
            "id": "0gjZidNFs7O2qqE2Z5elJ3",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/267968e38e8ae466e458ed00a685a1e30ac0c7f9",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/be75cbd7ac2f383672b53bfd122207d8050cbb68",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/9afb00d74d5bb6b51da22dd7ea3c0ae09c602662",
                "width": 64
            }],
            "name": "FEFE (feat. Nicki Minaj & Murda Beatz)",
            "release_date": "2018-07-22",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:0gjZidNFs7O2qqE2Z5elJ3"
        },
        {
            "album_type": "album",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3grHWM9bx2E9vwJCdlRv9O"
                },
                "href": "https://api.spotify.com/v1/artists/3grHWM9bx2E9vwJCdlRv9O",
                "id": "3grHWM9bx2E9vwJCdlRv9O",
                "name": "Kenny Chesney",
                "type": "artist",
                "uri": "spotify:artist:3grHWM9bx2E9vwJCdlRv9O"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/77spqXa3VNN0mw13PgWWyY"
            },
            "href": "https://api.spotify.com/v1/albums/77spqXa3VNN0mw13PgWWyY",
            "id": "77spqXa3VNN0mw13PgWWyY",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/79364a75a4e14a9fb8d41c937fe837299768edcf",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/113303de84207893283352296a021cea2bd9bbba",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/fa4b9728d3249e9c768fc511683cede1e12f4ae6",
                "width": 64
            }],
            "name": "Songs for the Saints",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:77spqXa3VNN0mw13PgWWyY"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1GDbiv3spRmZ1XdM1jQbT7"
                },
                "href": "https://api.spotify.com/v1/artists/1GDbiv3spRmZ1XdM1jQbT7",
                "id": "1GDbiv3spRmZ1XdM1jQbT7",
                "name": "Natti Natasha",
                "type": "artist",
                "uri": "spotify:artist:1GDbiv3spRmZ1XdM1jQbT7"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4VMYDCV2IEDYJArk749S6m"
                },
                "href": "https://api.spotify.com/v1/artists/4VMYDCV2IEDYJArk749S6m",
                "id": "4VMYDCV2IEDYJArk749S6m",
                "name": "Daddy Yankee",
                "type": "artist",
                "uri": "spotify:artist:4VMYDCV2IEDYJArk749S6m"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6GqwwrkVft6MmdRLhpeh0E"
            },
            "href": "https://api.spotify.com/v1/albums/6GqwwrkVft6MmdRLhpeh0E",
            "id": "6GqwwrkVft6MmdRLhpeh0E",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/0be9aa130ac7fe50d6d8158b2ecaaa85c8e01aa9",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/7796ccc5b671f98d3ed5730de77be8b050b86127",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/590f435510eb096ceebafbb25607a9ddf46fec58",
                "width": 64
            }],
            "name": "Buena Vida",
            "release_date": "2018-07-25",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6GqwwrkVft6MmdRLhpeh0E"
        },
        {
            "album_type": "album",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/5QdEbQJ3ylBnc3gsIASAT5"
                },
                "href": "https://api.spotify.com/v1/artists/5QdEbQJ3ylBnc3gsIASAT5",
                "id": "5QdEbQJ3ylBnc3gsIASAT5",
                "name": "G Herbo",
                "type": "artist",
                "uri": "spotify:artist:5QdEbQJ3ylBnc3gsIASAT5"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/23DYJsw4uSCguIqiTIDtcN"
                },
                "href": "https://api.spotify.com/v1/artists/23DYJsw4uSCguIqiTIDtcN",
                "id": "23DYJsw4uSCguIqiTIDtcN",
                "name": "Southside",
                "type": "artist",
                "uri": "spotify:artist:23DYJsw4uSCguIqiTIDtcN"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6Ii9GOGk4v4NWJIDjAbe87"
            },
            "href": "https://api.spotify.com/v1/albums/6Ii9GOGk4v4NWJIDjAbe87",
            "id": "6Ii9GOGk4v4NWJIDjAbe87",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/9705b649976e5307e928a69c073c21033e358722",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/26eb80956df1b47cee08da033cce4b9676c21019",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/1e8426d83a71066f70852f6e9757770e75b05cb0",
                "width": 64
            }],
            "name": "Swervo",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6Ii9GOGk4v4NWJIDjAbe87"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3534yWWzmxx8NbKVoNolsK"
                },
                "href": "https://api.spotify.com/v1/artists/3534yWWzmxx8NbKVoNolsK",
                "id": "3534yWWzmxx8NbKVoNolsK",
                "name": "Wolfgang Gartner",
                "type": "artist",
                "uri": "spotify:artist:3534yWWzmxx8NbKVoNolsK"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4TYgQbteeZ21gHdgCRuoM3"
            },
            "href": "https://api.spotify.com/v1/albums/4TYgQbteeZ21gHdgCRuoM3",
            "id": "4TYgQbteeZ21gHdgCRuoM3",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/b5f4b2c0e10e196eefa4e2e2a3e642596bc6897e",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/602ba804827236af245cde0c928b455435bb8ac4",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/b8ce17ede56271b8622d66cdc9ec13dff80c4613",
                "width": 64
            }],
            "name": "Freak",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:4TYgQbteeZ21gHdgCRuoM3"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp"
                },
                "href": "https://api.spotify.com/v1/artists/69GGBxA162lTqCwzJG5jLp",
                "id": "69GGBxA162lTqCwzJG5jLp",
                "name": "The Chainsmokers",
                "type": "artist",
                "uri": "spotify:artist:69GGBxA162lTqCwzJG5jLp"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/5aCENfD0bq3iECT2Mvx0mV"
            },
            "href": "https://api.spotify.com/v1/albums/5aCENfD0bq3iECT2Mvx0mV",
            "id": "5aCENfD0bq3iECT2Mvx0mV",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/990b14662df8fe5c027283bd398df43f12636243",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/4a41a24725d9e92189f057326a18a5496464b727",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/9572122444d2c6a7c5e58e437280123492596d5d",
                "width": 64
            }],
            "name": "Sick Boy...Side Effects",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:5aCENfD0bq3iECT2Mvx0mV"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6vwjIs0tbIiseJMR3pqwiL"
                },
                "href": "https://api.spotify.com/v1/artists/6vwjIs0tbIiseJMR3pqwiL",
                "id": "6vwjIs0tbIiseJMR3pqwiL",
                "name": "Beartooth",
                "type": "artist",
                "uri": "spotify:artist:6vwjIs0tbIiseJMR3pqwiL"
            }],
            "available_markets": [],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/7qYmVt7BRXkWP7T5sEPxdw"
            },
            "href": "https://api.spotify.com/v1/albums/7qYmVt7BRXkWP7T5sEPxdw",
            "id": "7qYmVt7BRXkWP7T5sEPxdw",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/f8888ad63d829dce411b2056cd94109de8a84aed",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/b94a911888365664dc31722c635e929ed9731e96",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/502397c8dd12bd6e9a8a473522fdb8558550e00b",
                "width": 64
            }],
            "name": "Disease / Bad Listener",
            "release_date": "2018-07-24",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:7qYmVt7BRXkWP7T5sEPxdw"
        },
        {
            "album_type": "album",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6fxyWrfmjcbj5d12gXeiNV"
                },
                "href": "https://api.spotify.com/v1/artists/6fxyWrfmjcbj5d12gXeiNV",
                "id": "6fxyWrfmjcbj5d12gXeiNV",
                "name": "Denzel Curry",
                "type": "artist",
                "uri": "spotify:artist:6fxyWrfmjcbj5d12gXeiNV"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6idVoBWP2mt1qoMtASm3gc"
            },
            "href": "https://api.spotify.com/v1/albums/6idVoBWP2mt1qoMtASm3gc",
            "id": "6idVoBWP2mt1qoMtASm3gc",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/8585ea1eb3166beff6cfc162a0cca2cc3b722b14",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/ffb23e90d1318731a11047c18358064ba2f3df7e",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/ec41ee0c2f592b251b9b8685d4e46c154a505022",
                "width": 64
            }],
            "name": "TA13OO",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6idVoBWP2mt1qoMtASm3gc"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6LEeAFiJF8OuPx747e1wxR"
                },
                "href": "https://api.spotify.com/v1/artists/6LEeAFiJF8OuPx747e1wxR",
                "id": "6LEeAFiJF8OuPx747e1wxR",
                "name": "Blood Orange",
                "type": "artist",
                "uri": "spotify:artist:6LEeAFiJF8OuPx747e1wxR"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/225NQB3CCjOwiEnDE2Y3Cd"
            },
            "href": "https://api.spotify.com/v1/albums/225NQB3CCjOwiEnDE2Y3Cd",
            "id": "225NQB3CCjOwiEnDE2Y3Cd",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/a3de8438d2f8aff321411378f7619c39c22875ba",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/c0ee7d2424ee82be93aa987a109bc567bd2e53f7",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/cab0a41d52dab823f703ce5f5a0d2078f5a0e4f2",
                "width": 64
            }],
            "name": "Charcoal Baby",
            "release_date": "2018-07-28",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:225NQB3CCjOwiEnDE2Y3Cd"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7vk5e3vY1uw9plTHJAMwjN"
                },
                "href": "https://api.spotify.com/v1/artists/7vk5e3vY1uw9plTHJAMwjN",
                "id": "7vk5e3vY1uw9plTHJAMwjN",
                "name": "Alan Walker",
                "type": "artist",
                "uri": "spotify:artist:7vk5e3vY1uw9plTHJAMwjN"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1eMmoIprPDWeFdB1FxU6ZV"
                },
                "href": "https://api.spotify.com/v1/artists/1eMmoIprPDWeFdB1FxU6ZV",
                "id": "1eMmoIprPDWeFdB1FxU6ZV",
                "name": "Au/Ra",
                "type": "artist",
                "uri": "spotify:artist:1eMmoIprPDWeFdB1FxU6ZV"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6064pL9Hu3Wx2bwJMeOx6o"
                },
                "href": "https://api.spotify.com/v1/artists/6064pL9Hu3Wx2bwJMeOx6o",
                "id": "6064pL9Hu3Wx2bwJMeOx6o",
                "name": "Tomine Harket",
                "type": "artist",
                "uri": "spotify:artist:6064pL9Hu3Wx2bwJMeOx6o"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/64WDoAGyTcPlSIFAiSDsB0"
            },
            "href": "https://api.spotify.com/v1/albums/64WDoAGyTcPlSIFAiSDsB0",
            "id": "64WDoAGyTcPlSIFAiSDsB0",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/5f9ed99f071ced583dfb5a1dcdac6c555dc755aa",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/f54d58d3c8ff2fb935cfbd8461a7bf867ec88e8b",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/f164a2ba24b716986dbbf2c40d34e5c84bddeec3",
                "width": 64
            }],
            "name": "Darkside",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:64WDoAGyTcPlSIFAiSDsB0"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1Bl6wpkWCQ4KVgnASpvzzA"
                },
                "href": "https://api.spotify.com/v1/artists/1Bl6wpkWCQ4KVgnASpvzzA",
                "id": "1Bl6wpkWCQ4KVgnASpvzzA",
                "name": "BROCKHAMPTON",
                "type": "artist",
                "uri": "spotify:artist:1Bl6wpkWCQ4KVgnASpvzzA"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/2YltjwKulQeLRj4C4O7M1X"
            },
            "href": "https://api.spotify.com/v1/albums/2YltjwKulQeLRj4C4O7M1X",
            "id": "2YltjwKulQeLRj4C4O7M1X",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/12e2cd58a5d1a0b64a1aeaaab6db66abcbea26eb",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/b3688324dc92aae2985cbaec302b4404c6bc9824",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/257de99dfd787ad1d64ac75448f8dd8aaf52bb81",
                "width": 64
            }],
            "name": "1997 DIANA",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:2YltjwKulQeLRj4C4O7M1X"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4ONwFcI8RGvYMG1vEIdS11"
                },
                "href": "https://api.spotify.com/v1/artists/4ONwFcI8RGvYMG1vEIdS11",
                "id": "4ONwFcI8RGvYMG1vEIdS11",
                "name": "Andrew Combs",
                "type": "artist",
                "uri": "spotify:artist:4ONwFcI8RGvYMG1vEIdS11"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/2V8YaOsCv3YQd01aVnVa1I"
            },
            "href": "https://api.spotify.com/v1/albums/2V8YaOsCv3YQd01aVnVa1I",
            "id": "2V8YaOsCv3YQd01aVnVa1I",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/69e4e5e6602be81c05f23fe4bdca5341d22774cb",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/81f2dba2632b132fa2689dfd20770a6f4fae8541",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/7549f44781466db25908add87bb32b28abea12f2",
                "width": 64
            }],
            "name": "5 Covers & A Song",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:2V8YaOsCv3YQd01aVnVa1I"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/59oA5WbbQvomJz2BuRG071"
                },
                "href": "https://api.spotify.com/v1/artists/59oA5WbbQvomJz2BuRG071",
                "id": "59oA5WbbQvomJz2BuRG071",
                "name": "Jungle",
                "type": "artist",
                "uri": "spotify:artist:59oA5WbbQvomJz2BuRG071"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/1ViVt8X9NdkPswI1oCns93"
            },
            "href": "https://api.spotify.com/v1/albums/1ViVt8X9NdkPswI1oCns93",
            "id": "1ViVt8X9NdkPswI1oCns93",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/130fcb3b10b5c35c14be29f8fdae027a950f4139",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/37dbed830155ec27a18703224b638ca8335b4b47",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/041be482fef7de8400d5be8ef759dfd344968950",
                "width": 64
            }],
            "name": "Heavy, California",
            "release_date": "2018-07-26",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:1ViVt8X9NdkPswI1oCns93"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/5LHRHt1k9lMyONurDHEdrp"
                },
                "href": "https://api.spotify.com/v1/artists/5LHRHt1k9lMyONurDHEdrp",
                "id": "5LHRHt1k9lMyONurDHEdrp",
                "name": "Tyga",
                "type": "artist",
                "uri": "spotify:artist:5LHRHt1k9lMyONurDHEdrp"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4RH1KjpPQxqtOTyV6WikPh"
            },
            "href": "https://api.spotify.com/v1/albums/4RH1KjpPQxqtOTyV6WikPh",
            "id": "4RH1KjpPQxqtOTyV6WikPh",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/87b67d9ec6067291a64a0b37e4118325091c172b",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/8cbd10ee88d112edbbfa4559e78ee554ac276921",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/04a28d38eb0abab886d76dc5486882cea669f48d",
                "width": 64
            }],
            "name": "SWISH",
            "release_date": "2018-07-25",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:4RH1KjpPQxqtOTyV6WikPh"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7ltDVBr6mKbRvohxheJ9h1"
                },
                "href": "https://api.spotify.com/v1/artists/7ltDVBr6mKbRvohxheJ9h1",
                "id": "7ltDVBr6mKbRvohxheJ9h1",
                "name": "ROSALÍA",
                "type": "artist",
                "uri": "spotify:artist:7ltDVBr6mKbRvohxheJ9h1"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6dOSikKvJSaL1F6i4SFmqY"
            },
            "href": "https://api.spotify.com/v1/albums/6dOSikKvJSaL1F6i4SFmqY",
            "id": "6dOSikKvJSaL1F6i4SFmqY",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/8c8b983b963e2f86db7f890d91ef022175dd9db1",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/5c939bb78f5369dccef79cb0f39f1ea6386e5fbb",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/ded59635d71a7d34db8798700760b62237c4edc5",
                "width": 64
            }],
            "name": "PIENSO EN TU MIRÁ (Cap.3: Celos)",
            "release_date": "2018-07-24",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6dOSikKvJSaL1F6i4SFmqY"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4LLpKhyESsyAXpc4laK94U"
                },
                "href": "https://api.spotify.com/v1/artists/4LLpKhyESsyAXpc4laK94U",
                "id": "4LLpKhyESsyAXpc4laK94U",
                "name": "Mac Miller",
                "type": "artist",
                "uri": "spotify:artist:4LLpKhyESsyAXpc4laK94U"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/0ppUC3Jf1kIDvOZsxCYpEe"
            },
            "href": "https://api.spotify.com/v1/albums/0ppUC3Jf1kIDvOZsxCYpEe",
            "id": "0ppUC3Jf1kIDvOZsxCYpEe",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/00f1b797cf233069db9eec18683cee4a47d95171",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/6dd91ca36a8dd29918947232b682f970a6fada36",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/c7d0595212796c5f3e9e5a4f26be291af0ab6b40",
                "width": 64
            }],
            "name": "What's the Use?",
            "release_date": "2018-07-23",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:0ppUC3Jf1kIDvOZsxCYpEe"
        }
    ];

    public featuredList = [
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4xRYI6VqpkE3UwrDrAZL8L"
                },
                "href": "https://api.spotify.com/v1/artists/4xRYI6VqpkE3UwrDrAZL8L",
                "id": "4xRYI6VqpkE3UwrDrAZL8L",
                "name": "Logic",
                "type": "artist",
                "uri": "spotify:artist:4xRYI6VqpkE3UwrDrAZL8L"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/0PypWtpDDSDP0IEg7LuoIw"
            },
            "href": "https://api.spotify.com/v1/albums/0PypWtpDDSDP0IEg7LuoIw",
            "id": "0PypWtpDDSDP0IEg7LuoIw",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/71b947d97f0e0b472f59f6963a2b6b39e7d50ac2",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/98850f970317b1b15f666dd49a8c166ca73c0632",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/422964643d7a6bdcafcd2e5070b904345ece9d16",
                "width": 64
            }],
            "name": "One Day (feat. Ryan Tedder)",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:0PypWtpDDSDP0IEg7LuoIw"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4Cqia9vrAbm7ANXbJGXsTE"
                },
                "href": "https://api.spotify.com/v1/artists/4Cqia9vrAbm7ANXbJGXsTE",
                "id": "4Cqia9vrAbm7ANXbJGXsTE",
                "name": "Slash",
                "type": "artist",
                "uri": "spotify:artist:4Cqia9vrAbm7ANXbJGXsTE"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1J0FSEQhWSMHcYqaapIjY6"
                },
                "href": "https://api.spotify.com/v1/artists/1J0FSEQhWSMHcYqaapIjY6",
                "id": "1J0FSEQhWSMHcYqaapIjY6",
                "name": "Myles Kennedy And The Conspirators",
                "type": "artist",
                "uri": "spotify:artist:1J0FSEQhWSMHcYqaapIjY6"
            }],
            "available_markets": [],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/7uonTXm4WR3QXhlpKi4Zv9"
            },
            "href": "https://api.spotify.com/v1/albums/7uonTXm4WR3QXhlpKi4Zv9",
            "id": "7uonTXm4WR3QXhlpKi4Zv9",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/f7802a5377d71600ad26593454c6edd3e6177c26",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/763647653a0319e1af8d31b754549d3abe0dbe06",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/2ddc30e7d50e6dd3f12b00cb6d155ab3d6b0ed9a",
                "width": 64
            }],
            "name": "Driving Rain (feat. Myles Kennedy & The Conspirators)",
            "release_date": "2018-07-25",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:7uonTXm4WR3QXhlpKi4Zv9"
        }
    ];

    public list = [
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1rSGNXhhYuWoq9BEz5DZGO"
                },
                "href": "https://api.spotify.com/v1/artists/1rSGNXhhYuWoq9BEz5DZGO",
                "id": "1rSGNXhhYuWoq9BEz5DZGO",
                "name": "ARTY",
                "type": "artist",
                "uri": "spotify:artist:1rSGNXhhYuWoq9BEz5DZGO"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/3iRAS0SJciT6qVEBUhtRLx"
            },
            "href": "https://api.spotify.com/v1/albums/3iRAS0SJciT6qVEBUhtRLx",
            "id": "3iRAS0SJciT6qVEBUhtRLx",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/ffc3305c1fd67c03160d87814ce594fce6d40b33",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/162109354cbd160820063df0c6eab149cff571c4",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/3b20919b5d197f9e03c6e162405b6ec4e2973bc8",
                "width": 64
            }],
            "name": "Tim",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:3iRAS0SJciT6qVEBUhtRLx"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1Cs0zKBU1kc0i8ypK3B9ai"
                },
                "href": "https://api.spotify.com/v1/artists/1Cs0zKBU1kc0i8ypK3B9ai",
                "id": "1Cs0zKBU1kc0i8ypK3B9ai",
                "name": "David Guetta",
                "type": "artist",
                "uri": "spotify:artist:1Cs0zKBU1kc0i8ypK3B9ai"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1zNqDE7qDGCsyzJwohVaoX"
                },
                "href": "https://api.spotify.com/v1/artists/1zNqDE7qDGCsyzJwohVaoX",
                "id": "1zNqDE7qDGCsyzJwohVaoX",
                "name": "Anne-Marie",
                "type": "artist",
                "uri": "spotify:artist:1zNqDE7qDGCsyzJwohVaoX"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4sqrDaJcbCIo6aeqO26maj"
            },
            "href": "https://api.spotify.com/v1/albums/4sqrDaJcbCIo6aeqO26maj",
            "id": "4sqrDaJcbCIo6aeqO26maj",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/0927ad8e0dd4608b21c083f446ef1b5cf599a8c0",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/f50acbd834d2403157d28f5bf295eb49d663e33b",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/522f5b53f20d941dfa1851f896f454f1f9bb3ac9",
                "width": 64
            }],
            "name": "Don't Leave Me Alone (feat. Anne-Marie)",
            "release_date": "2018-07-26",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:4sqrDaJcbCIo6aeqO26maj"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7gZfnEnfiaHzxARJ2LeXrf"
                },
                "href": "https://api.spotify.com/v1/artists/7gZfnEnfiaHzxARJ2LeXrf",
                "id": "7gZfnEnfiaHzxARJ2LeXrf",
                "name": "6ix9ine",
                "type": "artist",
                "uri": "spotify:artist:7gZfnEnfiaHzxARJ2LeXrf"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0hCNtLu0JehylgoiP8L4Gh"
                },
                "href": "https://api.spotify.com/v1/artists/0hCNtLu0JehylgoiP8L4Gh",
                "id": "0hCNtLu0JehylgoiP8L4Gh",
                "name": "Nicki Minaj",
                "type": "artist",
                "uri": "spotify:artist:0hCNtLu0JehylgoiP8L4Gh"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3CbYyyd8wH3RT6t0jwpdzC"
                },
                "href": "https://api.spotify.com/v1/artists/3CbYyyd8wH3RT6t0jwpdzC",
                "id": "3CbYyyd8wH3RT6t0jwpdzC",
                "name": "Murda Beatz",
                "type": "artist",
                "uri": "spotify:artist:3CbYyyd8wH3RT6t0jwpdzC"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/0gjZidNFs7O2qqE2Z5elJ3"
            },
            "href": "https://api.spotify.com/v1/albums/0gjZidNFs7O2qqE2Z5elJ3",
            "id": "0gjZidNFs7O2qqE2Z5elJ3",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/267968e38e8ae466e458ed00a685a1e30ac0c7f9",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/be75cbd7ac2f383672b53bfd122207d8050cbb68",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/9afb00d74d5bb6b51da22dd7ea3c0ae09c602662",
                "width": 64
            }],
            "name": "FEFE (feat. Nicki Minaj & Murda Beatz)",
            "release_date": "2018-07-22",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:0gjZidNFs7O2qqE2Z5elJ3"
        },
        {
            "album_type": "album",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3grHWM9bx2E9vwJCdlRv9O"
                },
                "href": "https://api.spotify.com/v1/artists/3grHWM9bx2E9vwJCdlRv9O",
                "id": "3grHWM9bx2E9vwJCdlRv9O",
                "name": "Kenny Chesney",
                "type": "artist",
                "uri": "spotify:artist:3grHWM9bx2E9vwJCdlRv9O"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/77spqXa3VNN0mw13PgWWyY"
            },
            "href": "https://api.spotify.com/v1/albums/77spqXa3VNN0mw13PgWWyY",
            "id": "77spqXa3VNN0mw13PgWWyY",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/79364a75a4e14a9fb8d41c937fe837299768edcf",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/113303de84207893283352296a021cea2bd9bbba",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/fa4b9728d3249e9c768fc511683cede1e12f4ae6",
                "width": 64
            }],
            "name": "Songs for the Saints",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:77spqXa3VNN0mw13PgWWyY"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1GDbiv3spRmZ1XdM1jQbT7"
                },
                "href": "https://api.spotify.com/v1/artists/1GDbiv3spRmZ1XdM1jQbT7",
                "id": "1GDbiv3spRmZ1XdM1jQbT7",
                "name": "Natti Natasha",
                "type": "artist",
                "uri": "spotify:artist:1GDbiv3spRmZ1XdM1jQbT7"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4VMYDCV2IEDYJArk749S6m"
                },
                "href": "https://api.spotify.com/v1/artists/4VMYDCV2IEDYJArk749S6m",
                "id": "4VMYDCV2IEDYJArk749S6m",
                "name": "Daddy Yankee",
                "type": "artist",
                "uri": "spotify:artist:4VMYDCV2IEDYJArk749S6m"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6GqwwrkVft6MmdRLhpeh0E"
            },
            "href": "https://api.spotify.com/v1/albums/6GqwwrkVft6MmdRLhpeh0E",
            "id": "6GqwwrkVft6MmdRLhpeh0E",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/0be9aa130ac7fe50d6d8158b2ecaaa85c8e01aa9",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/7796ccc5b671f98d3ed5730de77be8b050b86127",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/590f435510eb096ceebafbb25607a9ddf46fec58",
                "width": 64
            }],
            "name": "Buena Vida",
            "release_date": "2018-07-25",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6GqwwrkVft6MmdRLhpeh0E"
        },
        {
            "album_type": "album",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/5QdEbQJ3ylBnc3gsIASAT5"
                },
                "href": "https://api.spotify.com/v1/artists/5QdEbQJ3ylBnc3gsIASAT5",
                "id": "5QdEbQJ3ylBnc3gsIASAT5",
                "name": "G Herbo",
                "type": "artist",
                "uri": "spotify:artist:5QdEbQJ3ylBnc3gsIASAT5"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/23DYJsw4uSCguIqiTIDtcN"
                },
                "href": "https://api.spotify.com/v1/artists/23DYJsw4uSCguIqiTIDtcN",
                "id": "23DYJsw4uSCguIqiTIDtcN",
                "name": "Southside",
                "type": "artist",
                "uri": "spotify:artist:23DYJsw4uSCguIqiTIDtcN"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6Ii9GOGk4v4NWJIDjAbe87"
            },
            "href": "https://api.spotify.com/v1/albums/6Ii9GOGk4v4NWJIDjAbe87",
            "id": "6Ii9GOGk4v4NWJIDjAbe87",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/9705b649976e5307e928a69c073c21033e358722",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/26eb80956df1b47cee08da033cce4b9676c21019",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/1e8426d83a71066f70852f6e9757770e75b05cb0",
                "width": 64
            }],
            "name": "Swervo",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6Ii9GOGk4v4NWJIDjAbe87"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3534yWWzmxx8NbKVoNolsK"
                },
                "href": "https://api.spotify.com/v1/artists/3534yWWzmxx8NbKVoNolsK",
                "id": "3534yWWzmxx8NbKVoNolsK",
                "name": "Wolfgang Gartner",
                "type": "artist",
                "uri": "spotify:artist:3534yWWzmxx8NbKVoNolsK"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4TYgQbteeZ21gHdgCRuoM3"
            },
            "href": "https://api.spotify.com/v1/albums/4TYgQbteeZ21gHdgCRuoM3",
            "id": "4TYgQbteeZ21gHdgCRuoM3",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/b5f4b2c0e10e196eefa4e2e2a3e642596bc6897e",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/602ba804827236af245cde0c928b455435bb8ac4",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/b8ce17ede56271b8622d66cdc9ec13dff80c4613",
                "width": 64
            }],
            "name": "Freak",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:4TYgQbteeZ21gHdgCRuoM3"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp"
                },
                "href": "https://api.spotify.com/v1/artists/69GGBxA162lTqCwzJG5jLp",
                "id": "69GGBxA162lTqCwzJG5jLp",
                "name": "The Chainsmokers",
                "type": "artist",
                "uri": "spotify:artist:69GGBxA162lTqCwzJG5jLp"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/5aCENfD0bq3iECT2Mvx0mV"
            },
            "href": "https://api.spotify.com/v1/albums/5aCENfD0bq3iECT2Mvx0mV",
            "id": "5aCENfD0bq3iECT2Mvx0mV",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/990b14662df8fe5c027283bd398df43f12636243",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/4a41a24725d9e92189f057326a18a5496464b727",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/9572122444d2c6a7c5e58e437280123492596d5d",
                "width": 64
            }],
            "name": "Sick Boy...Side Effects",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:5aCENfD0bq3iECT2Mvx0mV"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6vwjIs0tbIiseJMR3pqwiL"
                },
                "href": "https://api.spotify.com/v1/artists/6vwjIs0tbIiseJMR3pqwiL",
                "id": "6vwjIs0tbIiseJMR3pqwiL",
                "name": "Beartooth",
                "type": "artist",
                "uri": "spotify:artist:6vwjIs0tbIiseJMR3pqwiL"
            }],
            "available_markets": [],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/7qYmVt7BRXkWP7T5sEPxdw"
            },
            "href": "https://api.spotify.com/v1/albums/7qYmVt7BRXkWP7T5sEPxdw",
            "id": "7qYmVt7BRXkWP7T5sEPxdw",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/f8888ad63d829dce411b2056cd94109de8a84aed",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/b94a911888365664dc31722c635e929ed9731e96",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/502397c8dd12bd6e9a8a473522fdb8558550e00b",
                "width": 64
            }],
            "name": "Disease / Bad Listener",
            "release_date": "2018-07-24",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:7qYmVt7BRXkWP7T5sEPxdw"
        },
        {
            "album_type": "album",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6fxyWrfmjcbj5d12gXeiNV"
                },
                "href": "https://api.spotify.com/v1/artists/6fxyWrfmjcbj5d12gXeiNV",
                "id": "6fxyWrfmjcbj5d12gXeiNV",
                "name": "Denzel Curry",
                "type": "artist",
                "uri": "spotify:artist:6fxyWrfmjcbj5d12gXeiNV"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6idVoBWP2mt1qoMtASm3gc"
            },
            "href": "https://api.spotify.com/v1/albums/6idVoBWP2mt1qoMtASm3gc",
            "id": "6idVoBWP2mt1qoMtASm3gc",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/8585ea1eb3166beff6cfc162a0cca2cc3b722b14",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/ffb23e90d1318731a11047c18358064ba2f3df7e",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/ec41ee0c2f592b251b9b8685d4e46c154a505022",
                "width": 64
            }],
            "name": "TA13OO",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6idVoBWP2mt1qoMtASm3gc"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6LEeAFiJF8OuPx747e1wxR"
                },
                "href": "https://api.spotify.com/v1/artists/6LEeAFiJF8OuPx747e1wxR",
                "id": "6LEeAFiJF8OuPx747e1wxR",
                "name": "Blood Orange",
                "type": "artist",
                "uri": "spotify:artist:6LEeAFiJF8OuPx747e1wxR"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/225NQB3CCjOwiEnDE2Y3Cd"
            },
            "href": "https://api.spotify.com/v1/albums/225NQB3CCjOwiEnDE2Y3Cd",
            "id": "225NQB3CCjOwiEnDE2Y3Cd",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/a3de8438d2f8aff321411378f7619c39c22875ba",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/c0ee7d2424ee82be93aa987a109bc567bd2e53f7",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/cab0a41d52dab823f703ce5f5a0d2078f5a0e4f2",
                "width": 64
            }],
            "name": "Charcoal Baby",
            "release_date": "2018-07-28",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:225NQB3CCjOwiEnDE2Y3Cd"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7vk5e3vY1uw9plTHJAMwjN"
                },
                "href": "https://api.spotify.com/v1/artists/7vk5e3vY1uw9plTHJAMwjN",
                "id": "7vk5e3vY1uw9plTHJAMwjN",
                "name": "Alan Walker",
                "type": "artist",
                "uri": "spotify:artist:7vk5e3vY1uw9plTHJAMwjN"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1eMmoIprPDWeFdB1FxU6ZV"
                },
                "href": "https://api.spotify.com/v1/artists/1eMmoIprPDWeFdB1FxU6ZV",
                "id": "1eMmoIprPDWeFdB1FxU6ZV",
                "name": "Au/Ra",
                "type": "artist",
                "uri": "spotify:artist:1eMmoIprPDWeFdB1FxU6ZV"
            }, {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6064pL9Hu3Wx2bwJMeOx6o"
                },
                "href": "https://api.spotify.com/v1/artists/6064pL9Hu3Wx2bwJMeOx6o",
                "id": "6064pL9Hu3Wx2bwJMeOx6o",
                "name": "Tomine Harket",
                "type": "artist",
                "uri": "spotify:artist:6064pL9Hu3Wx2bwJMeOx6o"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/64WDoAGyTcPlSIFAiSDsB0"
            },
            "href": "https://api.spotify.com/v1/albums/64WDoAGyTcPlSIFAiSDsB0",
            "id": "64WDoAGyTcPlSIFAiSDsB0",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/5f9ed99f071ced583dfb5a1dcdac6c555dc755aa",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/f54d58d3c8ff2fb935cfbd8461a7bf867ec88e8b",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/f164a2ba24b716986dbbf2c40d34e5c84bddeec3",
                "width": 64
            }],
            "name": "Darkside",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:64WDoAGyTcPlSIFAiSDsB0"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1Bl6wpkWCQ4KVgnASpvzzA"
                },
                "href": "https://api.spotify.com/v1/artists/1Bl6wpkWCQ4KVgnASpvzzA",
                "id": "1Bl6wpkWCQ4KVgnASpvzzA",
                "name": "BROCKHAMPTON",
                "type": "artist",
                "uri": "spotify:artist:1Bl6wpkWCQ4KVgnASpvzzA"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/2YltjwKulQeLRj4C4O7M1X"
            },
            "href": "https://api.spotify.com/v1/albums/2YltjwKulQeLRj4C4O7M1X",
            "id": "2YltjwKulQeLRj4C4O7M1X",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/12e2cd58a5d1a0b64a1aeaaab6db66abcbea26eb",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/b3688324dc92aae2985cbaec302b4404c6bc9824",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/257de99dfd787ad1d64ac75448f8dd8aaf52bb81",
                "width": 64
            }],
            "name": "1997 DIANA",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:2YltjwKulQeLRj4C4O7M1X"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4ONwFcI8RGvYMG1vEIdS11"
                },
                "href": "https://api.spotify.com/v1/artists/4ONwFcI8RGvYMG1vEIdS11",
                "id": "4ONwFcI8RGvYMG1vEIdS11",
                "name": "Andrew Combs",
                "type": "artist",
                "uri": "spotify:artist:4ONwFcI8RGvYMG1vEIdS11"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/2V8YaOsCv3YQd01aVnVa1I"
            },
            "href": "https://api.spotify.com/v1/albums/2V8YaOsCv3YQd01aVnVa1I",
            "id": "2V8YaOsCv3YQd01aVnVa1I",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/69e4e5e6602be81c05f23fe4bdca5341d22774cb",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/81f2dba2632b132fa2689dfd20770a6f4fae8541",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/7549f44781466db25908add87bb32b28abea12f2",
                "width": 64
            }],
            "name": "5 Covers & A Song",
            "release_date": "2018-07-27",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:2V8YaOsCv3YQd01aVnVa1I"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/59oA5WbbQvomJz2BuRG071"
                },
                "href": "https://api.spotify.com/v1/artists/59oA5WbbQvomJz2BuRG071",
                "id": "59oA5WbbQvomJz2BuRG071",
                "name": "Jungle",
                "type": "artist",
                "uri": "spotify:artist:59oA5WbbQvomJz2BuRG071"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/1ViVt8X9NdkPswI1oCns93"
            },
            "href": "https://api.spotify.com/v1/albums/1ViVt8X9NdkPswI1oCns93",
            "id": "1ViVt8X9NdkPswI1oCns93",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/130fcb3b10b5c35c14be29f8fdae027a950f4139",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/37dbed830155ec27a18703224b638ca8335b4b47",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/041be482fef7de8400d5be8ef759dfd344968950",
                "width": 64
            }],
            "name": "Heavy, California",
            "release_date": "2018-07-26",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:1ViVt8X9NdkPswI1oCns93"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/5LHRHt1k9lMyONurDHEdrp"
                },
                "href": "https://api.spotify.com/v1/artists/5LHRHt1k9lMyONurDHEdrp",
                "id": "5LHRHt1k9lMyONurDHEdrp",
                "name": "Tyga",
                "type": "artist",
                "uri": "spotify:artist:5LHRHt1k9lMyONurDHEdrp"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/4RH1KjpPQxqtOTyV6WikPh"
            },
            "href": "https://api.spotify.com/v1/albums/4RH1KjpPQxqtOTyV6WikPh",
            "id": "4RH1KjpPQxqtOTyV6WikPh",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/87b67d9ec6067291a64a0b37e4118325091c172b",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/8cbd10ee88d112edbbfa4559e78ee554ac276921",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/04a28d38eb0abab886d76dc5486882cea669f48d",
                "width": 64
            }],
            "name": "SWISH",
            "release_date": "2018-07-25",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:4RH1KjpPQxqtOTyV6WikPh"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7ltDVBr6mKbRvohxheJ9h1"
                },
                "href": "https://api.spotify.com/v1/artists/7ltDVBr6mKbRvohxheJ9h1",
                "id": "7ltDVBr6mKbRvohxheJ9h1",
                "name": "ROSALÍA",
                "type": "artist",
                "uri": "spotify:artist:7ltDVBr6mKbRvohxheJ9h1"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6dOSikKvJSaL1F6i4SFmqY"
            },
            "href": "https://api.spotify.com/v1/albums/6dOSikKvJSaL1F6i4SFmqY",
            "id": "6dOSikKvJSaL1F6i4SFmqY",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/8c8b983b963e2f86db7f890d91ef022175dd9db1",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/5c939bb78f5369dccef79cb0f39f1ea6386e5fbb",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/ded59635d71a7d34db8798700760b62237c4edc5",
                "width": 64
            }],
            "name": "PIENSO EN TU MIRÁ (Cap.3: Celos)",
            "release_date": "2018-07-24",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:6dOSikKvJSaL1F6i4SFmqY"
        },
        {
            "album_type": "single",
            "artists": [{
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4LLpKhyESsyAXpc4laK94U"
                },
                "href": "https://api.spotify.com/v1/artists/4LLpKhyESsyAXpc4laK94U",
                "id": "4LLpKhyESsyAXpc4laK94U",
                "name": "Mac Miller",
                "type": "artist",
                "uri": "spotify:artist:4LLpKhyESsyAXpc4laK94U"
            }],
            "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/0ppUC3Jf1kIDvOZsxCYpEe"
            },
            "href": "https://api.spotify.com/v1/albums/0ppUC3Jf1kIDvOZsxCYpEe",
            "id": "0ppUC3Jf1kIDvOZsxCYpEe",
            "images": [{
                "height": 640,
                "url": "https://i.scdn.co/image/00f1b797cf233069db9eec18683cee4a47d95171",
                "width": 640
            }, {
                "height": 300,
                "url": "https://i.scdn.co/image/6dd91ca36a8dd29918947232b682f970a6fada36",
                "width": 300
            }, {
                "height": 64,
                "url": "https://i.scdn.co/image/c7d0595212796c5f3e9e5a4f26be291af0ab6b40",
                "width": 64
            }],
            "name": "What's the Use?",
            "release_date": "2018-07-23",
            "release_date_precision": "day",
            "type": "album",
            "uri": "spotify:album:0ppUC3Jf1kIDvOZsxCYpEe"
        }
    ];

    public navList = [
        {name: 'New Releases', value: 'new-releases', inform: 'New album releases featured in Spotify'},
    ];

    constructor( private store: Store<fromMusicRoot.State>,
                 private router: Router ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromMusicRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromMusicRoot.getSearchFeaturedList));
        this.listQuery$ = this.store.pipe(select(fromMusicRoot.getSearchQuery));
        this.listPage$ = this.store.pipe(select(fromMusicRoot.getSearchPage));
        this.listTotalPages$ = this.store.pipe(select(fromMusicRoot.getSearchTotalPage));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromMusicRoot.getSearchResults),
            skip(1)
        ).subscribe(() => {
            window.scroll({top: 0, behavior: 'smooth'});
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    public handleNavListOptionClick( res: any ) {
        this.router.navigate(['music/list', res.type]);
    }

    /**
     * Go a specific page of the list
     * */
    public goToPage( event: any ): void {
        this.router.navigate(['music/list', event.query, {page: event.page}]);
    }
}
