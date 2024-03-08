import { Component, OnInit } from '@angular/core';
import { Suino } from '../../models/suino.model';
import { DataBaseService } from '../../utils/data-base.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalcularIdadePipe } from "../../utils/calcular-idade.pipe";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-listar-suinos',
    standalone: true,
    templateUrl: './listar-suinos.component.html',
    styleUrl: './listar-suinos.component.css',
    imports: [CommonModule, FormsModule, CalcularIdadePipe]
})
export class ListarSuinosComponent implements OnInit {

  //Lista dos suínos
  loadedSuinos: Suino[] = [];

  //Filtros
  filtroBrincoPai: string = '';
  
  constructor(private dataBaseService:DataBaseService, private datePipe: DatePipe) { }

  ngOnInit():void{
    this.getSuinos();
  }

  getSuinos(){
    this.dataBaseService.getSuinos().subscribe((responseData : Suino[]) => {
      console.log(responseData);
      this.loadedSuinos = responseData;
      console.log(this.loadedSuinos);     
    });
  }

   // Método para formatar a data antes de passá-la para o pipe personalizado
   formatarData(data: string | null): string {
    if (data) {
      const parts = data.split('/'); // Divida a string de data em partes (dia, mês, ano)
      const dateObj = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])); // Crie um objeto Date com as partes da data
      return this.datePipe.transform(dateObj, 'dd/MM/yyyy') || ''; // Formata a data para o formato "dd/MM/yyyy"
    } else {
      return '';
    }
  }

}
