import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../../../../theme/components/modals/default-modal/default-modal.component';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { PrintMachineService } from '../../../../_services/index';

@Component({
  selector: 'inputs',
  templateUrl: './inputs.html',
})
export class Inputs {

     public form:FormGroup;
    public machineCode:AbstractControl;
  public password:AbstractControl;
    constructor(
  private modalService: NgbModal,fb:FormBuilder,
  private printMachineService: PrintMachineService) {

  this.form = fb.group({
      'machineCode': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
   this.machineCode = this.form.controls['machineCode'];
this.password = this.form.controls['password'];
  }

  login() {

    this.printMachineService.save(this.machineCode.value, this.password.value)
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
