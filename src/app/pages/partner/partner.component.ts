import {Component} from '@angular/core';

import { Overlay, DialogRef } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from './partner.service';
import { RestaurantService } from '../../_services/index';

@Component({
  selector: 'partner',
  template: `<router-outlet></router-outlet>`
})
export class Partner {

   constructor() {
  }
}