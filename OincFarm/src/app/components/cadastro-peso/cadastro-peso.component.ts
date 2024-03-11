import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//@angular/material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Suino } from '../../models/suino.model';
import { BancoService } from '../../utils/banco.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-peso',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,MatSelectModule, ReactiveFormsModule, CommonModule, MatNativeDateModule, MatButton,],
  templateUrl: './cadastro-peso.component.html',
  styleUrl: './cadastro-peso.component.css'
})
export class CadastroPesoComponent {

  pesoForm!: FormGroup;
  suinos!: Suino[];

  constructor(private fb: FormBuilder, private servico: BancoService, private snackBar: MatSnackBar) { 
  }

  ngOnInit() {
   
    this.pesoForm = this.fb.group({
      brincoSuino: ['', Validators.required],
      dataPesagem: ['', Validators.required],
      pesoKg: ['', Validators.required]
    });
    this.carregarSuinos();
  }

  carregarSuinos() {
    this.servico.getSuinos().subscribe(suinos => {
      this.suinos = suinos;
    });
  }

  isAnimalBrincoValid() {
    return this.pesoForm.get('brincoSuino')?.invalid && this.pesoForm.get('brincoSuino')?.touched;
  }

  submitPeso(): void {
    if (this.pesoForm.valid) {
      this.servico.adicionarPesoSuino(this.pesoForm.value.brincoSuino, this.pesoForm.value).subscribe(() => {
        this.snackBar.open('Peso cadastrado com sucesso!', 'Fechar', { duration: 6000 });
        this.pesoForm.reset;
      });
    } else {
      this.snackBar.open('Formulário inválido. Por favor, cheque as informações.', 'Fechar', { duration: 6000 });
    }
  }

}
