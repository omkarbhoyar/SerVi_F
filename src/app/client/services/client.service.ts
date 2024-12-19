import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';


const Basic_URL = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
 
 
  getMyBookings() :Observable <any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(Basic_URL + `api/Client/my-bookings/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
    
  }

  constructor(private http: HttpClient) {}

  getAllAds(): Observable<any> {
    return this.http.get(Basic_URL + `api/Client/ads`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  
  searchAdByName(name : any): Observable<any> {
    return this.http.get(Basic_URL + `api/Client/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAdDetailsByAdId(adId : any): Observable<any> {
    return this.http.get(Basic_URL + `api/Client/ad/${adId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  bookService(bookDTO : any): Observable<any> {
    return this.http.post(Basic_URL + `api/Client/book-service`,bookDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }
  giveReview(reviewDTO : any): Observable<any> {
    return this.http.post(Basic_URL + `api/Client/review`, reviewDTO, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer' + UserStorageService.getToken()
    );
  }

}
