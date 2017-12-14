import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";

import { routing } from './restaurant.routing';
import { Restaurant } from './restaurant.component';
import { RestaurantList } from './components/restaurantList/restaurantList.component';


import { SmartTables } from './components/smartTables/smartTables.component';
import { SmartTablesService } from './components/smartTables/smartTables.service';
import { DataTables } from './components/dataTables/dataTables.component';
import { DataTablesService } from './components/dataTables/dataTables.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    DataTableModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  declarations: [
    Restaurant,
    RestaurantList,
    
    SmartTables,
    DataTables

  ],
  providers: [
    SmartTablesService,
    DataTablesService
  ]
})
export class RestaurantModule {
}
