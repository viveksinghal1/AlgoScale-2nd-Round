import { Component, OnInit } from '@angular/core';
import { PasswordValidator } from '../../validators/password.validator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  success = "";
  error = "";
  regisForm: FormGroup;
  submitted = false;
  allFieldsValid = false;

  isFieldValid(field: string) {
    return (this.regisForm.get(field).invalid && this.regisForm.get(field).touched)
      || (this.regisForm.get(field).untouched && this.submitted);
  }

  getErrorMsg(field: string, minlength: number) {
    let result = "";
    let errors = this.regisForm.get(field).errors;
    let element = this.regisForm.get(field);
    if (element.touched && errors.required) {
      result += "*" + field + " is required";
    }
    else if (element.touched && errors.email) {
      result = '*email must be in form of abc@abc.com';
    }
    else if (element.touched && errors.minlength) {
      result = "*" + field + " must be at least " + minlength + " characters long";
    }
    return result;
  }

  reset() {
    if (this.submitted) {
      this.submitted = false;
      this.regisForm.markAsPristine();
      this.regisForm.markAsUntouched();
    }
  }

  register() {
    this.submitted = true;
    if (this.regisForm.valid) {
      this.allFieldsValid = true;
      console.log(this.regisForm);
      this._authService.register(this.regisForm.value)
      .subscribe(
        res => {
          console.log("success");
          localStorage.setItem('token', res.idToken);
          localStorage.setItem('username', res.username);
          this._router.navigate(['/dashboard']);
        },
        err => {
          this.error = err.error,
          console.log(err.error)
        }
      )
    }
  }

  constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.regisForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", Validators.required]
    }, {validators: PasswordValidator});
  }

}
