import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancoService } from '../../utils/banco.service';
import { ActivatedRoute } from '@angular/router';

//@angular/material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatSelectModule, ReactiveFormsModule, CommonModule  ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

  editarForm!: FormGroup;
  //suino: Suino = { brinco: 0, brincoPai: 0, brincoMae: 0, dataNascimento: '', dataSaida: '', status: 'Ativo', sexo: 'M' };
  suino: any;
  constructor(
    private fb: FormBuilder,
    private servico: BancoService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.editarForm = this.fb.group({
      brincoPai: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      brincoMae: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dataNascimento: ['', Validators.required],
      dataSaida: [''],
      status: ['', Validators.required],
      sexo: ['', Validators.required],
    });

    
    this.route.fragment.subscribe(fragment => {
      if (fragment && this.editarForm) { // Verifica se editarForm está definido
        const suinoParam = JSON.parse(fragment);
        if (suinoParam) {
          this.suino = suinoParam;
          this.preencherFormulario();
        }
      }
    });
  }

  preencherFormulario() {
    console.log(this.suino);
    this.editarForm.patchValue(this.suino); // Preenche automaticamente os valores do formulário com os dados do suíno
  }


  editarSuino(event: Event) {
    event.preventDefault();
    if (this.editarForm.valid) {
      this.servico.adicionarSuino(this.editarForm.value);
      this.editarForm.reset();
    }
    else {
      console.log("Formulário inválido. Por favor, preencha todos os campos obrigatórios.");
    }
  }

}
