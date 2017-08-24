import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {BackStatProvider} from "./back-stat.provider";
import {Observable} from "rxjs/Observable";
@Injectable()
export class ServiceInterceptorService implements HttpInterceptor {

    constructor(public bs: BackStatProvider) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const token = this.bs.get_token();

        if (token) {
            // Clone the request to add the new header.
            const authReq = req.clone({headers: req.headers.set('x-access-token', token)});
            // Pass on the cloned request instead of the original request.
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }

    }
}
