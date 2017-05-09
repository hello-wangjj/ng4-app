import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {HeroService} from "./shared/hero.service";
import { HeroesComponent } from './heroes/heroes.component';
import {app_routes} from "./app.route";
import { DashBoardComponent } from './dash-board/dash-board.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    app_routes
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
