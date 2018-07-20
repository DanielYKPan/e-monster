/**
 * book.service
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Book } from './book.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class GoogleBookService {

    private readonly GOOGLE_API_PATH = 'https://www.googleapis.com/books/v1/volumes';

    private readonly NY_API_PATH = 'https://api.nytimes.com/svc/books/v3/lists.json';

    private readonly NY_API_API_KEY = 'b02a669476d2423fb3514ae47d013c99';

    constructor( private http: HttpClient ) {
    }

    public searchBooks( queryTitle: string ): Observable<Book[]> {
        return this.http
            .get<{ items: Book[] }>(`${this.GOOGLE_API_PATH}?q=${queryTitle}`)
            .pipe(map(books => books.items || []));
    }

    public retrieveBook( volumeId: string ): Observable<Book> {
        return this.http.get<Book>(`${this.GOOGLE_API_PATH}/${volumeId}`);
    }
}
