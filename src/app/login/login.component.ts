import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() showHide: boolean = false;
  loginForm: FormGroup;
  errorMsg: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.validateForm();
   }

  ngOnInit(): void {
  }

  validateForm(){
    const regex = '[a-zA-Z.]{3,50}';
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(regex), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitData(loginData){
    if(this.loginForm.valid) {
      this.appService.userlogin(loginData.value.username,loginData.value.password)
      .pipe(first())
      .subscribe(data => {
        const admin = Number(data[0].flag_adjucator);

        if(admin === 0){
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/judge"]);
        }
      },
      error => {
        console.error(error);
        if(error){
          this.errorMsg = true;
        }
      }
      )
    } else {
      this.loginForm.get('username').markAsTouched();
      this.loginForm.get('password').markAsTouched();
    }
  }

  closeLogin(){
    this.showHide = !this.showHide;
  }


  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

}
