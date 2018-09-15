import { Injectable } from '@angular/core';
import { Authenticate, User } from '../../model';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AuthService {

    public redirectUrl: string;

    constructor() {
    }

    public login( inform: Authenticate ): Observable<User> {

        /**
         * Simulate a failed login to display the error
         * message for the login form.
         */
        if (inform.username !== 'test' || inform.password !== '123') {
            return throwError('Invalid username or password');
        }

        return of({name: 'User'});
    }

    public logout(): Observable<any> {
        return of(true);
    }
}
