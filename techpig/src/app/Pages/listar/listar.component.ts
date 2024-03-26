import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../utils/banco.service';
import { Suino } from '../../Models/suino';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {


  isLoading: boolean = true;
  filteredSuinos: Suino[] = [];
  listaSuinos: Suino[] = [];
  dataSource!: MatTableDataSource<any>;
  statusFilter: string = 'Todos';
  sexFilter: string = 'Todos';

  constructor(
    private bancoService: BancoService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private route: Router) { }
    //displayedColumns: string[] = ['brinco', 'brincoPai', 'brincoMae', 'dataNascimento', 'dataSaida', 'status', 'sexo', 'editar'];
    displayedColumns: string[] = ['brinco', 'brincoPai', 'brincoMae', 'dataNascimento', 'dataSaida', 'sexo', 'status', 'idade', 'actions'];

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.getSuinos();
    this.bancoService.getSuinosUpdated().subscribe(() => {
      this.getSuinos();
    });
  }

  
  calculateAgeInMonths(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getMonth() - birth.getMonth() + (12 * (today.getFullYear() - birth.getFullYear()));
    if (today.getDate() < birth.getDate()) {
      age--;
    }
    return age;
  }


  applyFilter(value: string, column: string): void {
    if (!value || value.toLowerCase() === 'todos') {
      this.filteredSuinos = this.listaSuinos;
    } else {
      this.filteredSuinos = this.listaSuinos.filter(suino => {
        if (column === 'dataNascimento') {
          const ageInMonths = this.calculateAgeInMonths(suino[column]);
          console.log(value);
          return ageInMonths.toString().includes(value.toLowerCase());
        } else {
          const columnKey = column as keyof Suino;
          const suinoValue = suino[columnKey];
          if (suinoValue !== undefined && suinoValue !== null) {
            const suinoValueString = suinoValue.toString().toUpperCase();
            console.log(suinoValueString);
            return suinoValueString.includes(value.toUpperCase());
          }
          return false;
        }
      });
    }
    console.log(this.filteredSuinos); 
    this.dataSource = new MatTableDataSource<Suino>(this.filteredSuinos);
  }
  getSuinos() {
    this.bancoService.getSuinos().subscribe((suinos) => {
      if (suinos) {
        const pigsArray = Object.values(suinos);
        this.listaSuinos = pigsArray;
        this.filteredSuinos = pigsArray;
        this.dataSource = new MatTableDataSource<Suino>(this.filteredSuinos);
      } else {
        console.log('Nenhum suíno encontrado.');
      }
    })
  }

  editar(suino: Suino) {
    //this.route.navigate(['/editarAnimal', suino.brinco]);
    //this.route.navigate(['/editarAnimal', { suino: JSON.stringify(suino) }]);
    
    this.route.navigate(['/editarAnimal'], { fragment: JSON.stringify(suino) });
  }
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
  
   // Método para formatar a data antes de passá-la para o pipe personalizado
   formatarData(data: string | null): string {
    if (data) {
      const parts = data.split('-'); // Divida a string de data em partes (dia, mês, ano)
      const dateObj = new Date(Number(parts[0]), Number(parts[1]), Number(parts[2].substring(0,2))); // Crie um objeto Date com as partes da data
      return this.datePipe.transform(dateObj, 'dd/MM/yyyy') || ''; // Formata a data para o formato "dd/MM/yyyy"
    } else {
      return '';
    }
  }
  
  openDialog(): void {
    // const dialogRef = this.dialog.open(PigFormComponent, {
    //   width: '800px',
    //   data: {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Modal fechado');
    // });
  }
}
