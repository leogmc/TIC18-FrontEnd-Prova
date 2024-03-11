import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PepePigBDService } from '../../Service/pepe-pig-bd.service';

@Component({
  selector: 'app-suino-forme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suino-forme.component.html',
  styleUrl: './suino-forme.component.css',
})
export class SuinoFormeComponent implements OnInit {
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
     this._serviceSuino.addSuino(this.addFormSuino.value).subscribe(
       (suino) => {
         console.log(suino);
         this.addFormSuino.reset();
         window.location.reload();
         this.closeModal();
       }
     );
    }
  }


  closeModal() {
    var modal = document.querySelector('.modal') as HTMLElement | null;
    if (modal) {
      modal.style.display = 'none';
    }
  }
  public openModal() {
    var modal = document.querySelector('.modal') as HTMLElement | null;
    if (modal) {
      modal.style.display = 'block';
    }
    console.log('openModal');
  }
}
function randonInt(arg0: number, arg1: number) {
  throw new Error('Function not implemented.');
}

