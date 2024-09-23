import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin!: FormGroup;
  flagShowPass: boolean;
  
  constructor(
    private form: FormBuilder,
    private router: Router
  ) {
    this.flagShowPass = false;
  }

  ngOnInit() {
    this.formLogin = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get userControl(): FormControl {
    return this.formLogin.get('user') as FormControl; // Aquí usas el 'as'
  }

  get passwordControl(): FormControl {
    return this.formLogin.get('password') as FormControl;
  }

  logIn() {
    console.log(this.formLogin.value)
  }
}
