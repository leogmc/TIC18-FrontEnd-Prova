import { AfterViewInit, Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suino } from '../../../Models/Views/suino';
import 'chartjs-adapter-date-fns';

import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { config } from 'rxjs';
import { PepePigBDService } from '../../../Service/pepe-pig-bd.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit{
  suino:any;
  pesos = [{
    Brinco: 3,
    Data: new Date(2018, 0, 1),
    Peso: 20,
  }];
  id: string = '';
  constructor(private router: ActivatedRoute, private _serviceSuino: PepePigBDService) {}

  
  ngOnInit(): void {

    this.id = this.router.snapshot.params['id'];
    console.log(this.id);
    this._serviceSuino.getSuinoPorId( Number(this.id)).subscribe(
      (suino) => {
        this.suino = suino;
        console.log(this.suino, 'suino');
      }
    )
  }

}
