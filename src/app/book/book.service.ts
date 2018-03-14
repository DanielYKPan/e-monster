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

    private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

    constructor(private http: HttpClient) {
    }

    public searchBooks(queryTitle: string): Observable<Book[]> {
        return this.http
            .get<{ items: Book[] }>(`${this.API_PATH}?q=${queryTitle}`)
            .pipe(map(books => books.items || []));
    }

    public retrieveBook(volumeId: string): Observable<Book> {
        return this.http.get<Book>(`${this.API_PATH}/${volumeId}`);
    }
}
