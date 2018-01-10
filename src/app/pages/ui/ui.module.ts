import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { routing }       from './ui.routing';
import { Ui } from './ui.component';

import { Modals } from './components/modals/modals.component';

import { DefaultModal } from './components/modals/default-modal/default-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgbDropdownModule,
    NgbModalModule,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    routing
  ],
  declarations: [
    
    Modals,
    
    Ui,
   
    DefaultModal
  ],
  exports: [
   Modals
  ],
  entryComponents: [
    DefaultModal
  ],
  providers: [
    
  ]
})
export class UiModule {
}
