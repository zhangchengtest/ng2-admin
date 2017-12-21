import {Component} from '@angular/core';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { PrintMachineService } from '../../../../_services/index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../../theme/components/modals/default-modal/default-modal.component';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  peopleTableData:Array<any>;

  constructor(private modal: Modal, private modalService: NgbModal,
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
            
            this.printMachineService.delete(id).subscribe(
                data => {
                    console.log(data);
                    this.printMachineService.list().subscribe(
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

    onPrint(id: string, name: string): void {
         this.printMachineService.print(id).subscribe(
                data => {
                    console.log(data);
                    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                        activeModal.componentInstance.message = 'error';
                          activeModal.componentInstance.modalContent = JSON.stringify(data);
                },
                error => {
                
                  console.log(error);
                 });
    
  }
}
