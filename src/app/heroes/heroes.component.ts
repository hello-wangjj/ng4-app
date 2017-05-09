import { Component, OnInit } from '@angular/core';
import {HeroService} from "../shared/hero.service";
import {Hero} from "../hero";
import {Router} from "@angular/router";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  heroIndex: any;
  heroesIndex: any[];
  constructor(private heroService: HeroService, private router: Router) {
  }
  ngOnInit() {
    // this.heroes = this.heroService.getAllHeroes();
    this.heroService.getHeroesByHttp().then(
      heroes => this.heroes = heroes
    );
    this.heroService.HeroesIndexChanged.subscribe(
      heroesIndex => {
        console.log(heroesIndex);
        this.heroesIndex = heroesIndex;
      }
    );
    // by EventEmitter
    // this.heroService.getHeroesByWildDog();
    // this.heroService.HeroesChanged.subscribe(
    //   (heroes: Hero[]) => this.heroes = heroes
    // );

  }
  onSelected(i: number): void {
    console.log(i);
    this.selectedHero = this.heroes[i];
    this.heroIndex = this.heroesIndex[i];
  };
  gotoDetail(): void {
    this.router.navigate(['/detail', this.heroIndex]);
  }
  add(name: string, id: string): void {
    name = name.trim();
    id = id.trim();
    if (!name) { return; }
    this.heroService.create(name, Number(id));
  }


}
