import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  //Subject(da biblioteca RxJS) é uma fonte de observadores,
  //como ele mesmo é um é possível fazer um subscribe
  //para ele como inserir valores nele chamando seu
  //método next(valor) como é feito no search.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // Insere um termo de pesquisa na fila do observador.
  // É chamado por meio de um evento de binding na caixa
  // de texto em um input de evento.
  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.heroes$ = this.searchTerms.pipe(
      // Faz esperar 300ms a cada dígito no teclado antes de considerar outro termo
      debounceTime(300),
      //Ignora um novo termo caso seja igual ao anterior
      distinctUntilChanged(),
      //Troca para um novo observador de pesquisa cada vez que o termo muda
      // obs: usando switchMap pode-se ter multiplas chamadas http e podem
      // não retornar na ordem enviada. O SwithcMap preserva a requisição
      // original enquanto retorna um observador da chamada mais recente.
      // Resultados de chamadas recentes são cancelados e descartados.
      switchMap((term: string) => this.heroService.searchHeroes(term)),

      //obs: Caso o serviço fosse chamado para cada vez que o usuário estivesse
      //teclando, isso iria causar um excesso de chamadas HTTP iria tomar muito
      //dos recursos disponiveis do servidor, gastando a disponibilidade da rede.
      // Ao invés disso, no ngOnInit() os operadores RxJS está tunelando os
      // observadores searchTerms em sequencias, reduzindo o numero de chamadas
      // para searchHeroeS() retornando um observador de herói.
      //
    );
  }
}
