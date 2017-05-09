import {RouterModule, Routes} from "@angular/router";
import {HeroesComponent} from "./heroes/heroes.component";
import {DashBoardComponent} from "./dash-board/dash-board.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
/**
 * Created by wangjj on 2017/5/4.
 */
const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashBoardComponent},
  {path: 'detail/:id', component: HeroDetailComponent}
]

export const app_routes = RouterModule.forRoot(APP_ROUTES);
