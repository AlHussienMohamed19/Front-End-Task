import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { UserModule } from './user/user.module';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    UserModule
  ],
  providers:[
    TranslateService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModulesModule { }
