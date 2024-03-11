import { Injectable, OnInit } from '@angular/core';
import { Suino } from '../Models/Views/suino';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PepePigBDService{
  private url = "https://pepapig-db62c-default-rtdb.firebaseio.com/"

  Suinos: Suino[] = [];
  

  constructor( private http: HttpClient) { }
 

  getSuinos(): Observable<Suino[]> {
    return this.http.get<{ [key: string]: { id: string; Brinco: number; BrincoPai: number; BrincoMae: number; DataNascimento: Date; DataSaida: Date; Sexo: string; Raca: string; Status: string } }>(`${this.url}/suinos.json`).pipe(
      map((resposta) => {
        console.log('Resposta do Firebase:', resposta);

        const suinos: Suino[] = [];
        for (const key in resposta) {
          if (resposta.hasOwnProperty(key)) {
            const suino = { ...resposta[key], id: key } as Suino;
            // Calcula e atribui a idade ao suino
            suino.Idade = this.calcularIdade(new Date(suino.DataNascimento));
            suinos.push(suino);
          }
        }
        return suinos;
      })
    );
  }
  getSuinoPorId(id: Number): Observable<Suino | null> {
    const url = `${this.url}/suinos/${id}.json`;
  
    return this.getSuinos().pipe(
      map((suinos) => {
        const suinoEncontrado = suinos.find((suino) => suino.Brinco === id);
        return suinoEncontrado || null;
      })
    );
  }
  


  private calcularIdade(dataNascimento: Date): number {
    const agora = new Date();
    const diferencaAnos = agora.getFullYear() - dataNascimento.getFullYear();

    // Verifica se já fez aniversário neste ano
    if (
      agora.getMonth() < dataNascimento.getMonth() ||
      (agora.getMonth() === dataNascimento.getMonth() && agora.getDate() < dataNascimento.getDate())
    ) {
      return diferencaAnos - 1;
    } else {
      return diferencaAnos;
    }
  }
  addSuino(suino: Suino){
    return this.http.post(this.url + 'suinos.json', suino);
  }

  updateSuino(suino: Suino, id: string): Observable<any> {
    const url = `${this.url}/suinos/${id}.json`; // Substitua '...' pela URL correta
  
    return this.http.put(url, suino);
  }
  deleteSuino(suino: Suino){
    const urldelete = `${this.url}/suinos/${suino.id}.json`;
    return this.http.delete(urldelete);
  }


}
