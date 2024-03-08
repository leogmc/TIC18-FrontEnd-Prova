import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancoService } from '../../banco.service';
import { Suino } from '../../Models/suino';

@Component({
  selector: 'app-cadastro-peso',
  templateUrl: './cadastro-peso.component.html',
  styleUrl: './cadastro-peso.component.css'
})
export class CadastroPesoComponent implements OnInit {
  pesoForm!: FormGroup;
  suinos!: Suino[];
  constructor(private fb: FormBuilder, private servico: BancoService) { }
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

  submitPeso(event: Event): void {
    if (this.pesoForm.valid) {
      this.servico.adicionarPesoSuino(this.pesoForm.value.brincoSuino, this.pesoForm.value).subscribe(() => {
        this.pesoForm.reset();
      });
    }
  }
}
