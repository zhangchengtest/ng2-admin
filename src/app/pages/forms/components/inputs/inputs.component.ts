import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../../theme/components/modals/default-modal/default-modal.component';

import { PrintMachineService } from '../../../../_services/index';

@Component({
  selector: 'inputs',
  templateUrl: './inputs.html',
})
export class Inputs {

   model: any = {};
    constructor(
  private modalService: NgbModal,
  private printMachineService: PrintMachineService) {}

  login() {
  	console.log(this.model.machineCode);

    this.printMachineService.save(this.model.machineCode, this.model.password)
            .subscribe(
                data => {
                    console.log(data);
                    if(data.success){
                        const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                      activeModal.componentInstance.message = 'success';
                        activeModal.componentInstance.modalContent = '保存成功';
                       
                    }else{
                      const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                      activeModal.componentInstance.message = 'error';
                        activeModal.componentInstance.modalContent = '保存失败';
                    }
                },
                error => {
                
                  console.log(error);
                  const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                    activeModal.componentInstance.message = 'error';
                    activeModal.componentInstance.modalContent = '保存失败';
           
      });
  	
  }
}
