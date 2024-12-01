import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './@AppService/services/user.service';
import { BaseService } from './@AppService/services/base/base.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './CommonComponents/header/header.component';
import { FooterComponent } from './CommonComponents/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from "@ngx-translate/core";
import { LoaderService } from './@AppService/services/loader.service';
import { LoaderComponent } from './CommonComponents/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    CommonModule,
    TranslateModule
  ],
  providers: [
    RouterOutlet,
    UserService,
    BaseService,
    ToastrService,
    LoaderService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'front-end-task';

  constructor() {

  }

  ngOnInit(): void {
  }



}
