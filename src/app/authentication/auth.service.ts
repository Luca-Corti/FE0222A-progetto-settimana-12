import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user-data';
import { BehaviorSubject, tap, map, Observable } from 'rxjs';
import { AuthData } from '../interfaces/auth-data';
import { LoginData } from '../interfaces/login-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http:HttpClient, private router:Router) {

  }

  private authSubject = new BehaviorSubject<null | AuthData>(null);
  user$= this.authSubject.asObservable()
  jwtHelper = new JwtHelperService()
  isLoggedIn:Observable<boolean> = this.user$.pipe(map(user => !!user))

  signUp(userData:UserData){
    return this.http.post("http://localhost:4201/register", userData)
  }
  login(userLogin:LoginData){
    return this.http.post("http://localhost:4201/login", userLogin)
    .pipe( tap((val:any) => {}),
    tap((data)=>{this.authSubject.next(data);
    localStorage.setItem("accessToken", JSON.stringify(data))
    })
    )
  }
  logout(){
    this.authSubject.next(null);
    localStorage.removeItem("accessToken");
    this.router.navigate(["/login"])

  }
  autoLogin(){
    const userjson= localStorage.getItem("accessToken")
    if(!userjson){
      return console.log("failed autologin")
    }
    const user:AuthData = JSON.parse(userjson)
    if(this.jwtHelper.isTokenExpired(user.accessToken)){
      this.logout()
    }
    this.authSubject.next(user)
  }

}
