import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BaseService {

  BackEndBaseUrl: string = "https://jsonplaceholder.typicode.com/";

  constructor(private http: HttpClient) {
  }
  
  get<T>(actionUrl: string, responseType?: any): Observable<T> {
    return this.http.get<T>(
      this.BackEndBaseUrl + actionUrl,
      { responseType: responseType }
    );
  }

}
