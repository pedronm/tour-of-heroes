import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';


  constructor(private messageService: MessageService,
              private http: HttpClient,) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]>{

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: Atualiza o herói no servidor */
  updateHero (hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
    /**
   * Trata ta operação http que falhou
   * Permite que o app continue.
   * @param operation - nome do método/operação/serviço que falhou
   * @param result - Valor opcional de retorno que é um um Observer
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: Enviar o erro para uma infraestrutura de logging
      console.error(error); // estamos imprimindo no console

      // TODO: Deixa o erro legível para o usuário
      this.log(`${operation} failed: ${error.message}`);

      // Permite que o app continue funcionando retornando apenas
      // um objeto vazio.
      return of(result as T);
    };
  }
}
