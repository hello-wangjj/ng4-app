import { Injectable } from '@angular/core';
import {Hero} from "../hero";
import {Heroes} from "./mock-heroes";

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(Heroes);
  }

}
