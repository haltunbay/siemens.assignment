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


    getCustomer(firstName: string, lastName: string): Observable<customer> {
        const url = `${webApiUrl}/single?firstName=${firstName}&lastName=${lastName}`;
        return this.http.get<customer>(url).pipe(
            tap(_ => this.log(`fetched customer name=${firstName} ${lastName}`)),
            catchError(this.handleError<customer>(`getCustomer name=${firstName} ${lastName}`))
        );
    }

    upsertCustomer(customer: customer): Observable<any> {
        return this.http.post(webApiUrl, customer, this.httpOptions).pipe(
            tap(_ => this.log(`updated hero id=${customer.firstName} ${customer.lastName}`)),
            catchError(this.handleError<any>('updateCustomer'))
        );
    }

    deleteCustomer(firstName: String, lastName: String) {
        return this.http.delete(`${webApiUrl}?firstName=${firstName}&lastName=${lastName}`, this.httpOptions).pipe(
            tap(_ => this.log(`deleted hero id=${firstName} ${lastName}`)),
            catchError(this.handleError<any>('deleteCustomer'))
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
