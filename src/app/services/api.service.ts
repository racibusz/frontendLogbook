import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:3000'
  constructor(private httpClient: HttpClient){}

  getData(endpoint:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/${endpoint}`)
  }
  postData(endpoint:string, payload: any):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/${endpoint}`, payload)
  }
}
