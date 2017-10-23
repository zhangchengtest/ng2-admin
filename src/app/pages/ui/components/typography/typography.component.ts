import {Component} from '@angular/core';

import { Overlay, DialogRef } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from './partner.service';
import { RestaurantService } from '../../../../_services/index';

@Component({
  selector: 'typography',
  templateUrl: './typography.html',
})
export class Typography {

   peopleTableData:Array<any>;

  constructor(private partnerService: PartnerService,
  	private restaurantService: RestaurantService, private router: Router, private modal: Modal
  ) {

   partnerService.list("2").subscribe(
                data => {
                    console.log(data);
                    this.peopleTableData = data;
                },
                error => {
                
                  console.log(error);
                
           
      });
  }


  detail(id: string, name: string): void {

    this.router.navigate(['/pages/ui/slim'], {queryParams:{'id': id}});
  }
}
