import {Component} from '@angular/core';

import { PrintMachineService } from '../../../../_services/index';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  peopleTableData:Array<any>;

  constructor(
    private printMachineService: PrintMachineService
  ) {

   printMachineService.list().subscribe(
                data => {
                    console.log(data);
                    this.peopleTableData = data;
                },
                error => {
                
                  console.log(error);
                
           
      });
  }
}
