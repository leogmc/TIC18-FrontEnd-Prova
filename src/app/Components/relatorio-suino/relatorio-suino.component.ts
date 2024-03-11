import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepePigBDService } from '../../Service/pepe-pig-bd.service';
import { Suino } from '../../Models/Views/suino';

@Component({
  selector: 'app-relatorio-suino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio-suino.component.html',
  styleUrl: './relatorio-suino.component.css',
})
export class RelatorioSuinoComponent implements OnInit {
  suinos: Suino[] = [];

  constructor(private _serviceSuino: PepePigBDService) {}

  ngOnInit() {
    this._serviceSuino.getSuinos().subscribe(
      (suinos) => {
        this.suinos = suinos;
        console.log(this.suinos);
      }
    );
  }

  getRelatorioVendas() {
    return this.suinos.filter((s) => s.Status === 'Vendido').length;
  }
  getRelatorioAtivos() {
    return this.suinos.filter((suino) => suino.Status === 'Ativo').length;
  }
  getRelatorioMortos() {
   return  this.suinos.filter((suino) => suino.Status === 'Morto').length;
  }
}
