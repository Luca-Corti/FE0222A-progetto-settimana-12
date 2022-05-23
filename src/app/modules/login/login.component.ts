import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private authSrv:AuthService) { }
  form = new FormGroup({
    "email": new FormControl('', [Validators.required, Validators.email]),
    "password": new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  hide = true;
  async onSubmit(){
    try {
      await this.authSrv.login(this.form.value).toPromise()
    }
    catch(error){
      console.log(error)
    }
    this.router.navigate([''])
  }
  redirect(){
    this.router.navigate(['/register'])
  }
  ngOnInit(): void {
    this.authSrv.user$.subscribe()
  }

}
