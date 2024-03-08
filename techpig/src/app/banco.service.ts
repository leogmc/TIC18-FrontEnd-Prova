// PetShop/src/app/banco.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, exhaustMap, map, of, take, tap } from 'rxjs';
import { Suino } from './Models/suino';
import { PesoSuino } from './Models/pesoSuino';

@Injectable({
  providedIn: 'root'
})

export class BancoService {

  apiURL = 'https://techpig-3d8dc-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  adicionarSuino(suino: Suino) {
    return this.http.post(this.apiURL, suino).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  getSuinos() {
    return this.http.get<{ [key: string]: Suino }>(`${this.apiURL}/suinos.json`).pipe(
      map((responseData) => {
        const listaArray: Suino[] = [];
        for (const key in responseData) {
          if ((responseData).hasOwnProperty(key)) {
            listaArray.push({ ...(responseData as any)[key], id: key });
          }
        }
        return listaArray;
      }
      ),
    );
  }


  apagarTodosSuinos() {
    return this.http.delete(`${this.apiURL}/suinos.json`);
  }

  // getSuino(id: string) {
  //   const result = this.http.get<Suino>(
  //     `https://techpig-3d8dc-default-rtdb.firebaseio.com/suinos/${id}.json`
  //   );
  //   console.log(result);
  //   return result;
  // }

  getSuino(id: string): Observable<Suino> {
    const url = `${this.apiURL}/suinos/${id}.json`;
    return this.http.get<Suino>(url)
      .pipe(
        tap((suino: Suino) => {
          console.log('Detalhes do Suíno:', suino);
        }),
        catchError(this.handleError<any>('getSuino'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Mantenha a aplicação em execução, mas emita um erro
      return of(result as T);
    };
  }
  verificarBrincoExistente(brinco: string): Observable<boolean> {
    const url = `${this.apiURL}/suinos.json`;
    return this.http.get<any>(url).pipe(
      map((suinos: any) => {
        if (suinos) {
          const brincos = Object.values(suinos).map((suino: any) => suino.brinco);
          return brincos.includes(brinco);
        }
        return false;
      })
    );
  }
  editarSuino(id: string, suino: Suino) {
    const url = `${this.apiURL}/suinos/${id}.json`;
    return this.http.put(url,
      suino,
      { observe: 'response' }
    );
  }
  adicionarPesoSuino(idSuino: string, pesoSuino: PesoSuino) {
    return this.http.post(`${this.apiURL}/pesos/${idSuino}.json`, pesoSuino);
  }

  getPesosSuino(idSuino: string) {
    return this.http.get<{ [key: string]: PesoSuino }>(`${this.apiURL}/pesos/${idSuino}.json`);
  }

  apagarTodosPesosSuino(idSuino: string) {
    return this.http.delete(`${this.apiURL}/pesos/${idSuino}.json`);
  }

  getPesoSuino(idSuino: string, idPeso: string) {
    return this.http.get<PesoSuino>(`${this.apiURL}/pesos/${idSuino}/${idPeso}.json`);
  }

  editarPesoSuino(idSuino: string, idPeso: string, pesoSuino: PesoSuino) {
    return this.http.put(`${this.apiURL}/pesos/${idSuino}/${idPeso}.json`, pesoSuino);
  }

  apagarPesoSuino(idSuino: string, idPeso: string) {
    return this.http.delete(`${this.apiURL}/pesos/${idSuino}/${idPeso}.json`);
  }
}
