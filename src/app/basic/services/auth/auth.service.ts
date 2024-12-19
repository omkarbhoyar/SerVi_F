import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const Basic_URL='http://localhost:8080/'
export const AUTH_HEADER = 'authorization';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private userStorageService : UserStorageService) { }


 registerClint(singupRequestDTO:any): Observable<any>{
  return this.http.post(Basic_URL+"Client/sign-up",singupRequestDTO)
 }
 
 registerCompany(singupRequestDTO:any): Observable<any>{
  return this.http.post(Basic_URL+"Company/sign-up",singupRequestDTO)
 }
 
 login(username: String, password: String){
  return this.http.post(Basic_URL+"authenticate",{username,password},{observe: 'response'})
  .pipe(
    map((res: HttpResponse<any>)=>{
      console.log(res.body)
      this.userStorageService.saveUser(res.body);
      const tokenLength = res.headers.get(AUTH_HEADER)?.length;
      const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7,tokenLength);
      console.log(bearerToken);
      this.userStorageService.saveToken(bearerToken);
      return res;
    })
  )
 }

}
