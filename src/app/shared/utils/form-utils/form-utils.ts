import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {

  /**
   * Verifica si un campo es inválido y fue tocado
   */
  static isValidField(form: FormGroup, fieldName: string): boolean {
    const control = form.controls[fieldName];

    return !!control?.errors && control.touched;
  }

  /**
   * Obtiene mensaje de error
   */
  static getFieldError(form: FormGroup, fieldName: string): string | null {

    const control = form.controls[fieldName];

    if (!control) return null;

    const errors = control.errors ?? {};

    return FormUtils.getTextError(errors);
  }

  /**
   * Traduce errores a texto
   */
  static getTextError(errors: ValidationErrors): string | null {

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'requiredTrue':
          return 'Debe aceptar este campo';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;


        case 'min':
          return `Valor mínimo: ${errors['min'].min}`;

        case 'max':
          return `Valor máximo: ${errors['max'].max}`;

        case 'email':
          return 'Formato de correo inválido';

        case 'pattern':
          return 'Formato inválido';

        case 'emailTaken':
          return 'Este correo ya está registrado';

        case 'passwordMismatch':
          return 'Las contraseñas no coinciden';

        default:
          return 'Error de validación';
      }
    }

    return null;
  }

  /**
   * Validación para FormArray
   */
  static isValidFieldInArray(formArray: FormArray, index: number): boolean {

    const control = formArray.controls[index];

    return !!control?.errors && control.touched;
  }

  /**
   * Error para FormArray
   */
  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {

    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index]?.errors ?? {};

    return FormUtils.getTextError(errors);
  }

}