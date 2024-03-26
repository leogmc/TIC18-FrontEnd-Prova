// PetShop/src/app/banco.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, exhaustMap, map, of, take, tap } from 'rxjs';
import { Suino } from '../Models/suino';
import { PesoSuino } from '../Models/pesoSuino';

@Injectable({
  providedIn: 'root'
})

export class BancoService {

  apiURL = 'https://techpig-3d8dc-default-rtdb.firebaseio.com/';
  private pigListUpdated = new Subject<void>();
  constructor(private http: HttpClient) { }

  adicionarSuino(suino: Suino) {
    return this.http.post(`${this.apiURL}/suinos.json`, suino).subscribe(
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

  getSuinosUpdated(): Observable<void> {
    return this.pigListUpdated.asObservable();
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
  
  apagarSuino(id: string): Observable<any> {
    const url = `${this.apiURL}/suinos/${id}.json`;
    return this.http.delete(url);
  }
  atualizarListaPesos(): Observable<PesoSuino[]> {
    // Construindo a URL para buscar todos os pesos de todos os suínos
    const url = `${this.apiURL}/pesos.json`;

    // Fazendo a requisição HTTP para buscar todos os pesos
    return this.http.get<{ [key: string]: { [key: string]: PesoSuino } }>(url).pipe(
      map(responseData => {
        // Convertendo a resposta para um array de pesos
        const listaPesos: PesoSuino[] = [];
        for (const keySuino in responseData) {
          if (responseData.hasOwnProperty(keySuino)) {
            for (const keyPeso in responseData[keySuino]) {
              if (responseData[keySuino].hasOwnProperty(keyPeso)) {
                listaPesos.push({ ...(responseData[keySuino][keyPeso] as PesoSuino), id: keyPeso });
              }
            }
          }
        }
        // Retornando a lista de pesos atualizada
        return listaPesos;
      })
    );
  }

  editarPesoSuino(idSuino: string, idPeso: string, pesoSuino: PesoSuino) {
    return this.http.put(`${this.apiURL}/pesos/${idSuino}/${idPeso}.json`, pesoSuino);
  }

  apagarPesoSuino(idSuino: string, idPeso: string) {
    return this.http.delete(`${this.apiURL}/pesos/${idSuino}/${idPeso}.json`);
  }


  obterTodosPesos(): Observable<PesoSuino[]> {
    const url = `${this.apiURL}/pesos.json`;
    return this.http.get<{ [key: string]: { [key: string]: PesoSuino } }>(url).pipe(
      map(responseData => {
        const listaPesos: PesoSuino[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            for (const keyPeso in responseData[key]) {
              if (responseData[key].hasOwnProperty(keyPeso)) {
                listaPesos.push({ ...(responseData[key][keyPeso] as PesoSuino), id: keyPeso });
              }
            }
          }
        }
        return listaPesos;
      })
    );
  }

  adicionarSessao(sessao: any) {
    this.http.post(`${this.apiURL}/sessoes.json`,sessao)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

}
