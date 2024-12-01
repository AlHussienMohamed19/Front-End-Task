import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { UserSearchOutputModel } from '../models/user/userSearchOutputModel';
import { Observable } from 'rxjs';
import { ServiceUrls } from '../urls/serviceUrls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private generalService: BaseService) { }


  search(): Observable<UserSearchOutputModel[]> {
    return this.generalService.get<UserSearchOutputModel[]>(
      ServiceUrls.SearchUser
    )
  }
}
