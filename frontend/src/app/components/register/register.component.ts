import { Component, OnInit } from '@angular/core';
import { PasswordValidator } from '../../validators/password.validator';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { allowedNameValidator } from 'src/app/validators/allowedname.validator';
import { forbiddenNameValidator } from 'src/app/validators/forbiddenName.validator';


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
    else if (element.touched && errors.allowedName) {
      result = "enter password as per given instructions";
    }
    else if (element.touched && errors.forbiddenName) {
      result = errors.forbiddenName.value + " username is not allowed";
    }
    else if (element.hasError('isUsernameUnique')) {
      result = "username already used. try another username.";
    }
    else if (element.hasError('isEmailUnique')) {
      result = "email already used. try another email.";
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
          this._router.navigate(['/login']);
        },
        err => {
          this.error = err.error,
          console.log(err.error)
        }
      )
    }
  }

  validateUsername(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout((res) => {
        this._authService.validateUsername(control.value).subscribe(() => {
          resolve(null);
        }, (err) => { 
          if (err.status===200)
            resolve(null);
          else
            resolve({ 'isUsernameUnique': true }); });
      }, 1000);
    });
    return q;
  }

  validateEmail(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout((res) => {
        this._authService.validateEmail(control.value).subscribe(() => {
          resolve(null);
        }, (err) => { 
          if (err.status===200)
            resolve(null);
          else
            resolve({ 'isEmailUnique': true }); });
      }, 1000);
    });
    return q;
  }

  constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.regisForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      email: ["", [Validators.required, Validators.email], this.validateEmail.bind(this)],
      username: ["", [Validators.required, Validators.minLength(5), forbiddenNameValidator(/admin|password/)], this.validateUsername.bind(this)],
      password: ["", [Validators.required, Validators.minLength(8), allowedNameValidator(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]],
      confirmPassword: ["", Validators.required]
    }, {validators: PasswordValidator});
  }

}
