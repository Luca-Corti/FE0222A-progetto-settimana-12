import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    "name": new FormControl('', [Validators.required, Validators.minLength(3)]),
    "email": new FormControl('', [Validators.required, Validators.email]),
    "password": new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  hide = true;
  async onSubmit(){
    console.log(this.form.value)
    try {
      await this.authSrv.signUp(this.form.value).toPromise()
    }
    catch(error){
      console.log(error)
    }
    this.router.navigate(['/login'])
  }
  constructor(private router:Router, private authSrv:AuthService) { }

  ngOnInit(): void {
  }

}
