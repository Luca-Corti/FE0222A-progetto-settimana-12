import { Component } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FE0222A-progetto-settimana-12';
  constructor(private authSrv:AuthService){
    this.authSrv.autoLogin()
  }
}
