import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { DefaultModal } from '../../../../../../theme/components/modals/default-modal/default-modal.component';

import { RestaurantService, PrintMachineService} from '../../../../../../_services/index';

@Component({
  selector: 'basic-form',
  styleUrls: ['./basicForm.scss'],
  templateUrl: './basicForm.html',
})
export class BasicForm {

  model: any = {};

  machines:Array<any>;
   public form:FormGroup;
  public restaurantName:AbstractControl;
  public printMachineId:AbstractControl;
  public printCount:AbstractControl;

  constructor(fb:FormBuilder,
  private modalService: NgbModal,
  private restaurantService: RestaurantService,  private printMachineService: PrintMachineService) {
     this.form = fb.group({
      'restaurantName': ['', Validators.compose([Validators.required])],
      'printMachineId': ['', Validators.compose([Validators.required])],
      'printCount': ['', Validators.compose([Validators.required])]
    });

    this.restaurantName = this.form.controls['restaurantName'];
    this.printMachineId = this.form.controls['printMachineId'];
    this.printCount = this.form.controls['printCount'];
    
    this.printCount.setValue('2');
    
      printMachineService.list().subscribe(
                data => {
                    console.log(data);
                    this.machines = data;
                },
                error => {
                
                  console.log(error);
                  });
  }

  save(values:Object) {
  	console.log(this.model.printCount);
    if (this.form.valid) {
      this.restaurantService.save(this.restaurantName.value, this.printMachineId.value, this.printCount.value)
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
}
