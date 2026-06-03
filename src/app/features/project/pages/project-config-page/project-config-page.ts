import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../shared/utils/form-utils/form-utils';

@Component({
  selector: 'app-project-config-page',
  imports: [ReactiveFormsModule],
  templateUrl: './project-config-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectConfigPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    lenguajes: this.fb.array(
      [
        this.fb.control('JavaScript', [Validators.required, Validators.minLength(3)]),
        this.fb.control('TypeScript', [Validators.required, Validators.minLength(3)]),
      ],
      [Validators.minLength(2)] // El array debe tener mínimo 2 lenguajes
    ),
    tipo: ['fullstack', Validators.required], // Radio buttons
    notificaciones: [true], // Switch
    terminosAceptados: [false, Validators.requiredTrue], // Checkbox obligatorio
  });
  
  // Control independiente para agregar nuevos lenguajes
  newLenguaje: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  // Getter para acceder al FormArray
  get lenguajes(): FormArray {
    return this.myForm.get('lenguajes') as FormArray;
  }

  // Agregar lenguaje al array
  onAddLenguaje() {
    if (this.newLenguaje.invalid) return;

    this.lenguajes.push(
      this.fb.control(this.newLenguaje.value, [
        Validators.required,
        Validators.minLength(3)
      ])
    );

    this.newLenguaje.reset();
  }

  // Eliminar lenguaje del array
  onDeleteLenguaje(index: number) {
    this.lenguajes.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    
    if (this.myForm.invalid) return;

    console.log('Proyecto guardado:', this.myForm.value);
  }
}