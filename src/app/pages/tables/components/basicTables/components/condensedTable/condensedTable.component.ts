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

  onDeleteConfirm(id: string, name: string): void {
   const dialogRef = this.modal.confirm()
    .size('sm')
    .titleHtml(``).
   cancelBtn(`取消`).
    okBtn(`确定`)

    .body(`确定删除`+ name)
        .open();

     dialogRef
       .then( dialogRef => {
           dialogRef.result.then( 
           result => {
           console.log(`${result}`);
            
            this.restaurantService.delete(id).subscribe(
                data => {
                    console.log(data);
                    this.restaurantService.list().subscribe(
                      data => {
                          console.log(data);
                          this.peopleTableData = data;
                      },
                      error => {
                      
                        console.log(error);
                
           
                   });
                },
                error => {
                
                  console.log(error);
                 });

           }, () => {
             console.log('not hehe');
           } );
       });
    
  }

  detail(id: string, name: string): void {
    this.router.navigate(['/pages/tables/datatables']);
  }
}
