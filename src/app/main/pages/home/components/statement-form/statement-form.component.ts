import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Statement } from '../../../../../core/services/statement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statement-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './statement-form.component.html',
  styleUrl: './statement-form.component.css',
})
export class StatementFormComponent {
  @Output() public submitted = new EventEmitter<Statement>();
  public form: FormGroup;

  public complexes: { name: string; value: string }[] = [
    { value: 'Стел', name: 'Стел' },
    { value: 'Квартал', name: 'Квартал' },
    { value: 'Композитор', name: 'Композитор' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: [
        '',
        [Validators.required, Validators.pattern('[- +()0-9]{10,12}')],
      ],
      name: ['', Validators.required],
      complex: ['', Validators.required],
    });
  }

  public onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue();
    this.submitted.emit(value);
    this.form.reset();
  }
}
