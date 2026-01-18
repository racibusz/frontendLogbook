import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:3000'
  constructor(private httpClient: HttpClient){}

  getData<T>(endpoint:string):Observable<T>{
    return this.httpClient.get<T>(`${this.baseUrl}/${endpoint}`)
  }
  postData<T>(endpoint:string, payload: any):Observable<T>{
    return this.httpClient.post<T>(`${this.baseUrl}/${endpoint}`, payload)
  }
}
