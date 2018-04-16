/**
 * review
 */

export interface IReviews {
    page: number;
    results: Array<{ author: string, content: string, id: string, url: string }>;
    total_pages: number;
    total_results: number;
}
