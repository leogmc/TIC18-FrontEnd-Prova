import { Component, OnInit } from '@angular/core';
import { Suino } from '../../models/suino.model';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalcularIdadePipe } from "../../utils/calcular-idade.pipe";
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BancoService } from '../../utils/banco.service';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-listar-suinos',
    standalone: true,
    templateUrl: './listar-suinos.component.html',
    styleUrl: './listar-suinos.component.css',
    imports: [CommonModule, FormsModule, CalcularIdadePipe, MatTableModule, MatIcon, RouterModule]
})
export class ListarSuinosComponent implements OnInit {



  //Lista dos suínos
  loadedSuinos: Suino[] = [];

  

  displayedColumns: string[] = ['brinco', 'brincoPai', 'brincoMae', 'dataNascimento', 'dataSaida', 'sexo', 'status', 'idade', 'actions'];

  apagarSuino(id: string) {
    this.bancoService.apagarSuino(id).subscribe({
      next: () => {
        this.snackBar.open('Suíno apagado com sucesso', 'Fechar', { duration: 3000 });
        // Recarregar a página após 1 segundo 
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (error: any) => {
        console.error('Erro ao apagar suíno:', error);
        this.snackBar.open('Erro ao apagar suíno', 'Fechar', { duration: 3000 });
      }
    });
  }
  
 

  //Filtros
  filtroBrincoPai: string = '';
  
  constructor(private datePipe: DatePipe, private bancoService: BancoService, private snackBar: MatSnackBar, private location : Location) { }

  ngOnInit():void{
    this.getSuinos();
  }

  getSuinos(){
    this.bancoService.getSuinos().subscribe((responseData : Suino[]) => {
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
