import { Component, OnInit } from '@angular/core';
import {Hero} from './hero';
import {HeroService} from "./shared/hero.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService) {
  }
  ngOnInit() {
    this.getHeroes();
  }
  onSelected(hero): void {
    this.selectedHero = hero;
  };
  getHeroes(): void {
    this.heroService.getHeroes().then(
      heroes => this.heroes = heroes
    );
  }
}
