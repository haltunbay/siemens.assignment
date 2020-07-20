import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap, last } from 'rxjs/operators';

const webApiUrl = 'api/customer';
@Injectable({ providedIn: 'root' })
export class CustomerService {

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<customer[]> {
        return this.http.get<customer[]>(webApiUrl)
            .pipe(
                tap(_ => this.log('fetched customers')),
                catchError(this.handleError<customer[]>('getCustomers', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getCustomer(firstName: string, lastName: string): Observable<customer> {
        const url = `${webApiUrl}/single?firstName=${firstName}&lastName=${lastName}`;
        return this.http.get<customer>(url).pipe(
            tap(_ => this.log(`fetched customer name=${firstName} ${lastName}`)),
            catchError(this.handleError<customer>(`getCustomer name=${firstName} ${lastName}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(`CustomerService: ${message}`);
    }
}
