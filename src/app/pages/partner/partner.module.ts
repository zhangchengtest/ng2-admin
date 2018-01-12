import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Partner } from './partner.component';
import { PartnerDetailComponent } from './component/detail/partnerDetail.component';
import { PartnerListComponent } from './component/list/partnerList.component';
import { routing }       from './partner.routing';
import { PartnerService } from './partner.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Partner,
    PartnerDetailComponent,
    PartnerListComponent

  ],
  providers: [
    PartnerService
  ]
})
export class PartnerModule {}
