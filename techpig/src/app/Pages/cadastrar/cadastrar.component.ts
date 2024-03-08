import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BancoService } from '../../banco.service';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit {
  suinoForm!: FormGroup;
  constructor(private fb: FormBuilder, private servico: BancoService) { }

  ngOnInit() {
    this.suinoForm = this.fb.group({
      brinco: ['', [Validators.required, Validators.pattern('^[0-9]*$')], [this.brincoExistenteValidator()]],
      brincoPai: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      brincoMae: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dataNascimento: ['', Validators.required],
      dataSaida: [''],
      status: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }

  adicionarSuino(event: Event) {
    if (this.suinoForm.valid) {
      this.servico.adicionarSuino(this.suinoForm.value);
      this.suinoForm.reset();
    } else {
      console.log("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }


  brincoExistenteValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const brinco = control.value;

      return this.servico.verificarBrincoExistente(brinco).pipe(
        map((existe: boolean) => (existe ? { brincoExistente: true } : null)),
        catchError(() => of(null))
      );
    };
  }

}
