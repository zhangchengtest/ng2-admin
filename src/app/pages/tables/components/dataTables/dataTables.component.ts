import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { DefaultModal } from '../../../../theme/components/modals/default-modal/default-modal.component';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { RestaurantService, PrintMachineService} from '../../../../_services/index';

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss']
})
export class DataTables {

  model: any = {};
  public restaurantId: string;
  
  machines:Array<any>;
  public form:FormGroup;
  public restaurantName:AbstractControl;
  public printMachineId:AbstractControl;
  public printCount:AbstractControl;

  constructor(fb:FormBuilder, public activeRoute:ActivatedRoute,
  private modalService: NgbModal,
  private restaurantService: RestaurantService, private router: Router,  private printMachineService: PrintMachineService,
  private modal: Modal) {
     this.form = fb.group({
      'restaurantName': ['', Validators.compose([Validators.required])],
      'printMachineId': ['', Validators.compose([Validators.required])],
      'printCount': ['', Validators.compose([Validators.required])]
    });

    this.restaurantName = this.form.controls['restaurantName'];
    this.printMachineId = this.form.controls['printMachineId'];
    this.printCount = this.form.controls['printCount'];
  
    
      printMachineService.list().subscribe(
                data => {
                    console.log(data);
                    this.machines = data;
                },
                error => {
                
                  console.log(error);
                  });
  }

   ngOnInit(){
        this.activeRoute.queryParams.subscribe(params => {
        this.restaurantId = params['id'];
        console.log(this.restaurantId);
        this.restaurantService.detail(this.restaurantId).subscribe(
                data => {
                    console.log(data);
                    this.restaurantName.setValue(data.restaurant.restaurantName);
                    this.printMachineId.setValue(data.restaurant.printMachineId);
                    this.printCount.setValue(data.restaurant.printCount);
                },
                error => {
                
                  console.log(error);
                  });

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
                          this.router.navigate(['/pages/tables/basictables']);
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


  update(values:Object) {
    console.log(this.model.printCount);
    if (this.form.valid) {
      this.restaurantService.update(this.restaurantId, this.restaurantName.value, this.printMachineId.value, this.printCount.value)
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

   updateStatus(values:Object) {
    if (this.form.valid) {
      this.restaurantService.updateStatus(this.restaurantId, "2")
              .subscribe(
                  data => {
                      console.log(data);
                      if(data.success){
                          location.href="https://wmcrm.baidu.com/crm?qt=apishopbindpage&source=F9F74AF78FFAA6FF3D464402FE7B5E3B35CB113ED612F2B1";
                      }else{
                        const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                        activeModal.componentInstance.message = 'error';
                          activeModal.componentInstance.modalContent = '绑定失败';
                      }
                  },
                  error => {
                  
                    console.log(error);
                    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                      activeModal.componentInstance.message = 'error';
                      activeModal.componentInstance.modalContent = '绑定失败';
             
        });
      }
    
  }

   goback() {
    this.router.navigate(['/pages/tables/basictables']);
  }
  
}
