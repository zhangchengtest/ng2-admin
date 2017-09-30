import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    opts: RequestOptions;
    constructor(private http: Http) {
       var headers: Headers = new Headers();
       headers.append('content-type', 'application/json; charset=utf-8');
       this.opts = new RequestOptions();
       this.opts.headers = headers;
    }

    login(phone: string, password: string) {
         console.log("hello man2");
         
        return this.http.post('/api/login', JSON.stringify({ phone: phone, password: password }),this.opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                 console.log("result "+user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
               
                return user;
            });
    }

    sendValidCode(phone: string) {
        console.log("hello man"+ phone);
        return this.http.post('api/sendValidCode', JSON.stringify({ phone: phone }), 
        this.opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let result = response.json();
                 console.log("result "+result);
              
                return result;
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}