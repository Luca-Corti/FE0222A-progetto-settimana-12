import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   return this.authSrv.user$.pipe(take(1),switchMap((user) => {

    if(!user){return next.handle(request)}

    const newRequest= request.clone({headers: request.headers
      .set("Authorization",`Bearer ${user?.accessToken}`)
      // .set("Cache-Control", "nocache, no-store, must-revalidate")
      // .set("Pragma", "no-cache")
      // .set("Expires", "0")
    })

    return next.handle(newRequest);
  }),
  catchError((err) => {
    //questa parte di interceptor cattura e traduce gli errori, sopratutto login e registrazione
    switch (err.error) {
      case 'Email and password are required':
        throw new Error('Email e password sono richiesti');
        case 'Incorrect password':
          throw new Error('La password incorretta');
        case 'Cannot find user':
          throw new Error('Utente non trovato');
      case 'Email already exists':
        throw new Error("L'email scelta è già in uso");
      case 'Email format is invalid':
        throw new Error('Formato email invalido');
    }
    throw new Error('Richiesta ha generato un errore');
  })
  );

  }
}
