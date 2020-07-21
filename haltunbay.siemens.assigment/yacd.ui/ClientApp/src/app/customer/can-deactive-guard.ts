import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CanDeactivateCustomer implements CanDeactivate<CustomerFormComponent> {
    constructor() { }

    canDeactivate(
        component: CustomerFormComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (component.canDeactivate()) {
            return confirm('There are changes you have made to the page. If you quit, you will lose your changes.');
        } else {
            return true;
        }
    }
}