import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private router:ActivatedRoute, private srv:MainService, private authSrv:AuthService) { }
  id!:number
  user:any
  logout(){
    this.authSrv.logout()
  }
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    let json = localStorage.getItem("accessToken");
     if(!json){ return}
     this.user = JSON.parse(json).user
  }

}
