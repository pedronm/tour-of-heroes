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
  location: any;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
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

  add(name: string): void{
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe( hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  hero(hero: any) {
    throw new Error("Method not implemented.");
  }


}
