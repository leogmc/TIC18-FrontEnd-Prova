import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Suino } from '../../Models/Views/suino';
import { CommonModule } from '@angular/common';
import { PepePigBDService } from '../../Service/pepe-pig-bd.service';

@Component({
  selector: 'app-suino-forme-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suino-forme-edit.component.html',
  styleUrl: './suino-forme-edit.component.css'
})
export class SuinoFormeEditComponent implements OnInit {
  @Input() suino?: Suino;
  id:string = '';
  addFormSuino!: FormGroup;
  constructor(private formBuilder: FormBuilder, private _serviceSuino: PepePigBDService) {

  }
  ngOnInit(): void {
    this.addFormSuino = this.formBuilder.group({
      Brinco: new FormControl('', [Validators.required]),
      BrincoPai: new FormControl('', [Validators.required]),
      BrincoMae: new FormControl('', [Validators.required]),
      DataNascimento: new FormControl('', [Validators.required]),
      Raca: new FormControl('', [Validators.required]),
      Sexo: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),
      DataSaida: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.addFormSuino.valid) {
      //adicionar criação
      
      this._serviceSuino.updateSuino(this.addFormSuino.value, this.id).subscribe(
        (suino) => {
          console.log(suino);
          this.addFormSuino.reset();
          this.closeModal();
          window.location.reload();
          
        }
      )
    }
  }

  ngOnChanges() {
    // Atualize o formulário sempre que o suíno for alterado
    if (this.suino) {
      this.addFormSuino.patchValue({
        Brinco: this.suino.Brinco,
        BrincoPai: this.suino.BrincoPai,
        BrincoMae: this.suino.BrincoMae,
        DataNascimento: this.suino.DataNascimento,
        Raca: this.suino.Raca,
        Sexo: this.suino.Sexo,
        Status: this.suino.Status,
        DataSaida: this.suino.DataSaida,
      });
      this.id = this.suino.id as string;

    }
  }

  EditSuino(suinoInput: Suino) {
   console.log(suinoInput, 'suinoInput');
    this.suino = suinoInput;
    this.ngOnChanges();
    this.openModal();
  }
  closeModal() {
    var modal = document.querySelector('.modal1') as HTMLElement | null;
    if (modal) {
      modal.style.display = 'none';
    }
  }
  public openModal() {
    var modal = document.querySelector('.modal1') as HTMLElement | null;
    if (modal) {
      modal.style.display = 'block';
    }
    console.log('openModal');
  }
}
