import {EventEmitter, Injectable} from '@angular/core';
import {Hero} from "../hero";
import {Heroes} from "./mock-heroes";
import * as wilddog from 'wilddog';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  ref: any;
  heroChanged = new EventEmitter<Hero>();
  Hero: Hero;
  Heroes: Hero[];
  HeroesChanged = new EventEmitter<Hero[]>();
  HeroesIndexChanged = new EventEmitter<any[]>();
  HeroesIndex: any;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) {
    const config = {
      // 输入节点 URL
      syncURL: "https://ng4-app.wilddogio.com"
    };
    wilddog.initializeApp(config);
    this.ref = wilddog.sync().ref();
  }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(Heroes);
  }
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(heroId: number): Promise<Hero> {
    const self = this;
    return this.getHeroes().then(
      heroes => {
        self.Hero = heroes.find(hero => hero.id === heroId);
        self.heroChanged.emit(self.Hero);
        return heroes.find(hero => hero.id === heroId);
        }
      // function (heroes) {
      //   console.log(heroes.find(hero => hero.id === heroId));
      //   self.Hero = heroes.find(hero => hero.id === heroId);
      //   self.hero.emit(self.Hero);
      //   console.log(self.hero);
      //   return heroes.find(hero => hero.id === heroId);
      // }
    );
  }

  getHeroesByHttp(): Promise<Hero[]> {
    const self = this;
    return this.http.get('https://ng4-app.wilddogio.com/heroes.json')
      .toPromise()
      .then(
        response => {
          const myHeroes = [];
          const myKeys = [];
          const data = response.json();
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              myHeroes.push(data[key]);
              myKeys.push(key);
            }
          }
          self.HeroesIndex = myKeys;
          self.HeroesIndexChanged.emit(self.HeroesIndex);
          self.Heroes = myHeroes;
          return self.Heroes;
        }
      )
      .catch(this.handleError);
  }
  getHeroByHttp(index: number): Promise<Hero> {
    const self = this;
    return this.http.get(`https://ng4-app.wilddogio.com/heroes/${index}.json`)
      .toPromise()
      .then(
        response => {
          self.Hero = response.json();
          return self.Hero;
        }
      )
      .catch(this.handleError);
  }
  getHeroesByWildDog() {
    const self = this;
    const getRef = this.ref.child('heroes');
    getRef.on('value', function (snapshot) {
      console.log(snapshot.val());
      self.Heroes = snapshot.val();
      self.HeroesChanged.emit(self.Heroes);
    }, function (error) {
      console.log('The read failed:' + error.code);
    });
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  update(heroIndex: number, hero: Hero) {
    const self = this;
    const postRef = this.ref.child('heroes').child(heroIndex);
    postRef.set(hero, function (error) {
    if (error === null) {
      console.log(hero);
      self.Hero = hero;
      self.heroChanged.emit(self.Hero);
  }
  });
  }

  create(name: string, id: number) {
    const self = this;
    const postRef = this.ref.child('heroes');
    postRef.push({
      name: name,
      id: id
    });
  }

}
