import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private dataURL: string = "https://localhost/rest/rank";

  constructor(private  httpClient: HttpClient) {
  }

  get(context: string): Observable<any> {
    let url = this.dataURL + (context ? `${context}` : '');
    return this.httpClient.get(url) as Observable<any>;
  }

  post(context: string, body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.dataURL}${context}`, body);
  }
}

