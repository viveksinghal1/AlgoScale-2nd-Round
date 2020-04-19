import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password');
    const cnfrmpswd = control.get('confirmPassword');
    if (password.pristine || cnfrmpswd.pristine)
        return null;
    return password && cnfrmpswd && password.value !== cnfrmpswd.value ?
        {'misMatch': true} : null;
} 