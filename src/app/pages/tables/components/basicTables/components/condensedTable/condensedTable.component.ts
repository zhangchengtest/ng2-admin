import {Component} from '@angular/core';

import { Overlay, DialogRef } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {BasicTablesService} from '../../basicTables.service';
import { RestaurantService } from '../../../../../../_services/index';

@Component({
  selector: 'condensed-table',
  templateUrl: './condensedTable.html'
})
export class CondensedTable {

  peopleTableData:Array<any>;

  constructor(private _basicTablesService: BasicTablesService,
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

    this.router.navigate(['/pages/tables/datatables'], {queryParams:{'id': id}});
  }
}
