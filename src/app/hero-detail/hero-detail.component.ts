import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../shared/hero.service";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero: Hero;
  private heroIndex: any;
  private subscription: Subscription;
  constructor(private heroService: HeroService, private activateRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    // this.activateRoute.params
    //   .switchMap((params: Params) => this.heroService.getHero(+params['id']))
    //   .subscribe(hero => this.hero = hero);
    this.subscription = this.activateRoute.params.subscribe(
      (params) => {
        this.heroIndex = params['id'];
        console.log(this.heroIndex);
        console.log('detail:', this.heroService.getHeroByHttp(this.heroIndex).then(
          hero => this.hero = hero
        ));
      }
    );
    // 使用EventEmitter
    // this.heroService.hero.subscribe(
    //   (hero: Hero) => this.hero = hero
    // );
  }
  goBack(): void {
    this.location.back();
  }
  save() {
    this.heroService.update(this.heroIndex, this.hero);
    this.heroService.heroChanged.subscribe(
      hero => {
        this.hero = hero;
        this.goBack();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
