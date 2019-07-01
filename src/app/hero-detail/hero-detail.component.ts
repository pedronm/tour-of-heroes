import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  getHero(): void{
    //snapshot: um reflexo estático das informações da rota depois que o componente é criado
    //paramMap: uma coleção dos parâmetros da url extraída da rota. o ID retorna o id que foi
    //passado pela url
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero) ;
  }

  goBack(): void {
    this.location.back();
  }
}
