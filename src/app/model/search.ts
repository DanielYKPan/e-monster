/**
 * search
 */

export type SearchType = 'movie' | 'tv' | 'music' | 'book' | 'people';

export interface ISearchResult {
    query: string;
    page: number;
    total_results: number;
    total_pages: number;
    results: any;
}
