import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
//import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url='http://localhost:3000';
  constructor(private http:HttpClient) { }
    signin(s1)
    {
      console.log(s1);
     return this.http.post(this.url+'/enter',s1);
    
    }
   
  }

