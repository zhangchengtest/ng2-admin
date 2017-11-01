import {Component} from '@angular/core';

import { Overlay, DialogRef } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../../_services/index';

@Component({
  selector: 'basic-tables',
  templateUrl: './restaurantList.html',
  styleUrls: ['./restaurantList.scss']

})
export class RestaurantList {

   peopleTableData:Array<any>;

  constructor(
  	private restaurantService: RestaurantService, private router: Router, private modal: Modal
  ) {

   restaurantService.list().subscribe(
                data => {
                    console.log(data);
                    this.peopleTableData = data;
                },
                error => {
                
                  console.log(error);
                
           
      });
  }


  detail(id: string, name: string): void {

    this.router.navigate(['/pages/restaurant/datatables'], {queryParams:{'id': id}});
  }
}
