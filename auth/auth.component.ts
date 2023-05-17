import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/authresponse';
import { AuthService } from '../auth.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginMode= true;
  Form:FormGroup;
  error="";
  
  
  
  constructor(private fb:FormBuilder, private auth:AuthService, private errorserv:ErrorService, private router:Router) { }
  errMsgs = this.errorserv.errormsg

  ngOnInit(): void {
    this.Form= this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onModeSwitch(){
    this.loginMode=!this.loginMode;
  }

  onSubmit(){
    

    if(this.Form.valid){
      console.log(this.Form.value);
      const email = this.Form.value.email;
      const password= this.Form.value.password;
      let authObservable:Observable<AuthResponse>

      if(this.loginMode){
        authObservable= this.auth.signin(email,password)

      }else{
        authObservable= this.auth.signup(email,password)
      }

      authObservable.subscribe(res=>{
        this.router.navigate(['/dashboard'])
        console.log(res);

      },
      err=>{
        //console.log(err);
         this.error = this.errMsgs[err]
        
      })
    
      

    }
    
  }

}
