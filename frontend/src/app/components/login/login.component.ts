import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  error = "";
  success = "";
  allFieldsValid = false;

  isFieldValid(field: string) {
    return (this.form.get(field).invalid && this.form.get(field).touched)
      || (this.form.get(field).untouched && this.submitted);
  }

  getErrorMsg(field: string, minlength: number) {
    let result = "";
    let errors = this.form.get(field).errors;
    let element = this.form.get(field);
    if (element.touched && errors.required) {
      result += "*" + field + " is required";
    }
    else if (element.touched && errors.minlength) {
      result = "*" + field + " must be at least " + minlength + " characters long";
    }
    return result;
  }

  reset() {
    if (this.submitted) {
      this.submitted = false;
      this.form.markAsUntouched();
      this.form.markAsPristine();
    }
  }

  login() {
    this.submitted = true;
    if (this.form.valid) {
      this.allFieldsValid = true;
      this._authService.loginUser(this.form.value)
      .subscribe(
        res => {
          this.success = "logged in";
          localStorage.setItem('token', res.idToken);
          localStorage.setItem('username', res.username);
          this._router.navigate(['/dashboard']);
        },
        err => {
          this.error = err.error;
          console.log(err);
          this.reset();
        }
      )
    }
  }


  constructor(private _authService: AuthService, private _router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

}
