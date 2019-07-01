import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
  hero: Hero ;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero):void{
    this.hero = hero;
  }

  getHeroes(): void{
    this.heroService.getHeroes()
    //Anteriormente a chamada ocorria sincronizadamente
    //Sendo essa chaamda fosse feita para um servidor remoto
    //haveria a possibilidade dessa chamada travar
    //a aplicação. Por isso usar o subscrive;
    .subscribe(heroes => this.heroes = heroes);
    //Ao fazer essa chamada com a utilização de um
    //subscribe, ela passa a ser assincrona
  }

  save(): void{
    this.heroService.updateHero(this.hero)
  }
}
