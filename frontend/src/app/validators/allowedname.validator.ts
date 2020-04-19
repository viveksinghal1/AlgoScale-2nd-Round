import { AbstractControl, ValidatorFn } from "@angular/forms";

export function allowedNameValidator(allowedName: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]:any} | null => {
        const forbidden = allowedName.test(control.value);
        return forbidden? null: {'allowedName': {value: control.value}};
    }
}