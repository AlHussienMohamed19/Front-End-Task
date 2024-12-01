import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoaderService } from '../../@AppService/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LoaderComponent {

  constructor(public loaderService:LoaderService) {
  }
}
