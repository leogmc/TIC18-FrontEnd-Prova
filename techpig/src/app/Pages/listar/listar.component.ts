import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../banco.service';
import { Suino } from '../../Models/suino';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent  implements OnInit {
  listaSuinos: any[] = []; 

  constructor(private bancoService: BancoService,
    private route: Router) { }
  displayedColumns: string[] = ['brinco', 'brincoPai', 'brincoMae', 'dataNascimento', 'dataSaida', 'status', 'sexo', 'editar'];

  ngOnInit(): void {
    this.getSuinos();
  }


  
  getSuinos() {
    this.bancoService.getSuinos().subscribe((suinos) => {
      this.listaSuinos = suinos;
    })
  }

  editar(suino: Suino){
    //this.route.navigate(['/editarAnimal', suino.brinco]);
    //this.route.navigate(['/editarAnimal', { suino: JSON.stringify(suino) }]);
    this.route.navigate(['/editarAnimal'], { fragment: JSON.stringify(suino) });
  }

}
