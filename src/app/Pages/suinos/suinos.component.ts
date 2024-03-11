import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RelatorioSuinoComponent } from '../../Components/relatorio-suino/relatorio-suino.component';
import { SuinoFormeComponent } from '../../Components/suino-forme/suino-forme.component';
import { SuinoFormeEditComponent } from "../../Components/suino-forme-edit/suino-forme-edit.component";
import { PepePigBDService } from '../../Service/pepe-pig-bd.service';
import { Suino } from '../../Models/Views/suino';

@Component({
    selector: 'app-suinos',
    standalone: true,
    templateUrl: './suinos.component.html',
    styleUrl: './suinos.component.css',
    imports: [
        CommonModule,
        FormsModule,
        RelatorioSuinoComponent,
        SuinoFormeComponent,
        SuinoFormeEditComponent
    ]
})
export class SuinosComponent implements OnInit {
  @ViewChild('suinoFormeRef') suinoFormeRef!: ElementRef<SuinoFormeComponent>;
  @ViewChild('suinoFormeEditRef') suinoFormeEditRef!: ElementRef<SuinoFormeEditComponent>;

  suinos: Suino[] = [];
  selectedField: string = 'Brinco'; // Campo padrão
  currentRoute: string = '';
  constructor(private router: Router, private _serviceSuino: PepePigBDService) {}
  deleteSuino(_t40: any) {
    this._serviceSuino.deleteSuino(_t40).subscribe(
      (suino) => {
        console.log(suino);
        this._serviceSuino.getSuinos().subscribe(
          (suinos) => {
            this.suinos = suinos;
            console.log(this.suinos);
          }
        );
      }
    );
  }


  ngOnInit() {
   this._serviceSuino.getSuinos().subscribe(
     (suinos) => {
       this.suinos = suinos;
       console.log(this.suinos);
     }
   );

   
  }

  buscar() {}

  navigateTo(arg0: string, brinco: number) {
    this.currentRoute = arg0;
    this.router.navigate([arg0 + brinco]);
  }
}
