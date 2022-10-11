import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export class CustomValidators {
    constructor(){

    }
  
    /**
     * Sprawdza czy wartośc z dwóch pól jest taka sama
     * @param formControlName nazwa pierwszej kontrolki
     * @param formControlName2 nazwa drugiej kontrolki
     * @returns notSame: true
     */
    validatorThisSameValue(formControlName: string, formControlName2: string,): ValidatorFn {
      return (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get(formControlName)?.value
        let pass2 = group.get(formControlName2)?.value
        return pass === pass2 ? null : { notSame: true }
      }
    }
  
    /**
     * Sprawdza czy wartośc value ma tą samą wartośc co w returnErrorWhenValue
     * @param value 
     * @param returnErrorWhenValue 
     * @returns boolError: true
     */
    validatorBool(value: boolean, returnErrorWhenValue: boolean):ValidatorFn{
      return(group: AbstractControl): ValidationErrors | null =>{
        return value == returnErrorWhenValue ? {boolError: true}: null
      }
    }
  
    /**
     * Sprawdza czy zakres dat jest prawidłowy
     * @param dateFromFormControlName 
     * @param dateToFormControlName 
     * @returns 
     */
    validatorDateRange(dateFromFormControlName: string, dateToFormControlName: string):ValidatorFn{
      return(group: AbstractControl): ValidationErrors | null => {
        let valueFrom = group.get(dateFromFormControlName)?.value
        let valutTo = group.get(dateToFormControlName)?.value
        let dateFrom = new Date(valueFrom)
        let dateTo = new Date(valutTo)
        return dateFrom > dateTo ? {dateRangeError: true} : null
      }
    }



    
}
