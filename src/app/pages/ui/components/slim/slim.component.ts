import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { DefaultModal } from '../../../../theme/components/modals/default-modal/default-modal.component';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { RestaurantService, PrintMachineService} from '../../../../_services/index';
import { PartnerService } from '../typography/partner.service';


@Component({
    selector: 'slim',
    styleUrls: ['./slim.scss'],
    templateUrl: './slim.html'
})
export class SlimComponent {

   model: any = {};
  public partnerRestaurantId: string;
   public partnerRestaurantName: string;
  
  machines:Array<any>;
  public form:FormGroup;
  public restaurantId:AbstractControl;
  

  constructor(fb:FormBuilder, public activeRoute:ActivatedRoute,
  private modalService: NgbModal,
  private restaurantService: RestaurantService, private router: Router,  private partnerService: PartnerService,
  private modal: Modal) {
     this.form = fb.group({
      'restaurantId': ['', Validators.compose([Validators.required])]
    });

    this.restaurantId = this.form.controls['restaurantId'];
  
    
      restaurantService.list().subscribe(
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
        this.partnerRestaurantId = params['id'];
        console.log(this.partnerRestaurantId);
        this.partnerService.detail(this.partnerRestaurantId).subscribe(
                data => {
                    console.log(data);
                    this.restaurantId.setValue(data.partner.restaurantId);
                    this.partnerRestaurantName = data.partner.partnerRestaurantName;
                },
                error => {
                
                  console.log(error);
                  });

    });
    }


update(values:Object) {
    console.log(this.model.printCount);
    if (this.form.valid) {
      this.partnerService.update(this.restaurantId.value, this.partnerRestaurantId)
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
 

   goback() {
    this.router.navigate(['/pages/ui/typography']);
  }
}
