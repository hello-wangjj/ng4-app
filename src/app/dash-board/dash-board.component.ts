import { Component, OnInit } from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../shared/hero.service";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  heroes: Hero[] = [];
  heroesIndex: any[];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroesByHttp().then(
      heroes => this.heroes = heroes.slice(0, 5)
    );
    this.heroService.HeroesIndexChanged.subscribe(
      heroesIndex => this.heroesIndex = heroesIndex.slice(0, 5)
    );
  }

}
