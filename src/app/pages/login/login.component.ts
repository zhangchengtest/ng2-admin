import {Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService, AlertService } from '../../_services/index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { DefaultModal } from '../../theme/components/modals/default-modal/default-modal.component';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {

  model: any = {};
  public form:FormGroup;
  public phone:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public validCodeMsg:string = "验证码"
  public haveSendValidCode:boolean = false;
  returnUrl: string;

  constructor(fb:FormBuilder, private authenticationService: AuthenticationService,
   private route: ActivatedRoute,private router: Router, private modalService: NgbModal) {
    this.form = fb.group({
      'phone': ['', Validators.compose([Validators.required, Validators.pattern('1(3|4|5|7|8)\\d{9}')])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.phone = this.form.controls['phone'];
    this.password = this.form.controls['password'];
  }


   ngOnInit() {
       

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);

      this.authenticationService.login(this.phone.value, this.password.value)
            .subscribe(
                data => {
                    console.log(data);
                    if(data.isSuccess){
                       console.log("login ok");
                       this.router.navigate([this.returnUrl]);
                    }else{
                      const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                      activeModal.componentInstance.message = 'error';
                        activeModal.componentInstance.modalContent = '验证码错误';
                    }
                },
                error => {
                
                  console.log(error);
                  const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
                    activeModal.componentInstance.message = 'error';
                    activeModal.componentInstance.modalContent = '验证码错误';
           
      });
    }

  }


  public helllo(){
   if(this.haveSendValidCode){
      return true;
   }else{
      if(this.phone.valid ){
          return false;
      }else{
        return true;
      }
   }
   
  }

  public sendValidCode(){
      console.log("send code");
      this.haveSendValidCode=true;
      this.validCodeMsg= "已发送";
     console.log(this.phone.value);

     this.authenticationService.sendValidCode(this.phone.value)
            .subscribe(
                data => {
                    //console.log(data);
                },
                error => {
                 const body = error.json() || '';
                    const err = body.error || JSON.stringify(body);
                    const err2 = JSON.stringify(err);
                  var errMsg =  `${err}`;
           
      });

  }

  


}
