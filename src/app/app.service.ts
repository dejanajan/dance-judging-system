import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Users } from './shared/users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  BASE_URL_GET: string = `${this.PHP_API_SERVER}/dancejudgingsystem/dancejudgingsystem/backend/`;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(
    private httpClient: HttpClient
  ) { }

  public userlogin(username, password) {
    return this.httpClient.post<Users[]>(this.BASE_URL_GET + 'login.php', { username, password })
    .pipe(map(Users => {
      this.setToken(Users[0].username);
      this.setCategory(Users[0].flag_dance_category.toString());
      this.getLoggedInName.emit(true);
      return Users;
    }));
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setCategory(cat: string){
    localStorage.setItem('adjucator_category', cat);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
    
  isLoggedIn() {
    const usertoken = this.getToken();
  if (usertoken != null) {
    return true
  }
    return false;
  }


}
