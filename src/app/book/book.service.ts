/**
 * book.service
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IBook } from '../model';

@Injectable()
export class GoogleBookService {

    private readonly GOOGLE_API_PATH = 'https://www.googleapis.com/books/v1/volumes';

    private readonly GOOGLE_API_KEY = 'AIzaSyAkzvrk5-MOUYzYLNjCguXd6MrZ7CplQn0';

    private readonly NY_API_PATH = 'https://content.api.nytimes.com/svc/books/v3/lists.json';

    private readonly NY_API_KEY = 'b02a669476d2423fb3514ae47d013c99';

    constructor( private http: HttpClient ) {
    }

    public searchBooks( queryTitle: string ): Observable<IBook[]> {
        return this.http
            .get<{ items: IBook[] }>(`${this.GOOGLE_API_PATH}?q=${queryTitle}`)
            .pipe(map(books => books.items || []));
    }

    public retrieveBook( volumeId: string ): Observable<IBook> {
        return this.http.get<IBook>(`${this.GOOGLE_API_PATH}/${volumeId}`);
    }

    public getBookList( query: string ): Observable<any> {
        return this.http.get(`${this.NY_API_PATH}?api-key=${this.NY_API_KEY}&list-name=${query}`)
            .pipe(
                map(( res: any ) => res.results),
                map(( results: any[] ) => results.map(( r ) => r.book_details[0])),
                switchMap(books => {
                    return forkJoin(books.map(( book ) => {
                        return this.http
                            .get(`${this.GOOGLE_API_PATH}?q=isbn:${book.primary_isbn10}&key=${this.GOOGLE_API_KEY}`)
                            .pipe(
                                map(( bs: any ) => {
                                    if (bs && bs.items) {
                                        return bs.items[0];
                                    }
                                }),
                            );
                    }));
                }),
                map((books) =>  books.filter((book) => !!book)),
                map((books) => {
                    return {
                        type: 'book',
                        query,
                        page: 1,
                        total_results: books.length,
                        total_pages: 1,
                        results: books
                    };
                })
            );
    }
}
