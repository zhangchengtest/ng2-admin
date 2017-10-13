import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class RestaurantService {

    opts: RequestOptions;
    constructor(private http: Http) {
       var headers: Headers = new Headers();
       headers.append('content-type', 'application/json; charset=utf-8');
       this.opts = new RequestOptions();
       this.opts.headers = headers;
    }

    list() {
         let data =  localStorage.getItem('currentUser');
         let ownerId = JSON.parse(data).token;
        return this.http.post('/api/restaurant/search', JSON.stringify({ ownerId: ownerId}),this.opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                
               
                return data;
            });
    }

     delete(id: string) {
         let data =  localStorage.getItem('currentUser');
         let ownerId = JSON.parse(data).token;
        return this.http.post('/api/restaurant/delete', JSON.stringify({ ownerId: ownerId, id: id}),this.opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                
               
                return data;
            });
    }

    detail(id: string) {
         let data =  localStorage.getItem('currentUser');
         let ownerId = JSON.parse(data).token;
        return this.http.get('/api/restaurant/detail/'+id, this.opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                
               
                return data;
            });
    }

     save(restaurantName: string, printMachineId: string, printCount: string) {
         let data =  localStorage.getItem('currentUser');
         let ownerId = JSON.parse(data).token;

        return this.http.post('/api/restaurant/save', JSON.stringify({ ownerId: ownerId, restaurantName: restaurantName, printMachineId: printMachineId, printCount: printCount}),this.opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                
               
                return data;
            });
    }

    update(restaurantId: string, restaurantName: string, printMachineId: string, printCount: string) {
         let data =  localStorage.getItem('currentUser');
         let ownerId = JSON.parse(data).token;
         console.log("he"+ restaurantId);
        return this.http.post('/api/restaurant/update', JSON.stringify({ id: restaurantId, ownerId: ownerId, restaurantName: restaurantName, printMachineId: printMachineId, printCount: printCount}),this.opts)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let data = response.json();
                
               
                return data;
            });
    }


    
}