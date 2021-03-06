import { StatService } from './../pages/stat/stat-service';
import { ListStatsComponent } from './../pages/stat/list-stats/list-stats';
import { TeamDetailComponent } from './../pages/dashboard/team-detail/team-detail';
import { DashboardHeaderComponent } from './../pages/dashboard/header/dashboard-header';
import { DetailGameComponent } from './../pages/dashboard/game/detail-game';
import { StatPage } from './../pages/stat/stat';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { BackStatProvider } from "../providers/back-stat.provider";
import { IonicStorageModule } from '@ionic/storage';
import { DashboardPage } from "../pages/dashboard/dashboard";
import { ReduceNamePipe } from "../pipes/reduce-name.pipe";
import { InitialePipe } from "../pipes/initiale.pipe";
import { CreateTeamPage } from "../pages/dashboard/create-team/create-team";
import { ServiceInterceptorService } from "../providers/service-interceptor.service";
import { CreatePlayerComponent } from "../pages/dashboard/player/create-player/create-player";
import { ManagePlayerComponent } from "../pages/dashboard/player/manage-player/manage-player";
import { RegisterPage } from "../pages/register/register";
import { CreateGamePage } from "../pages/dashboard/create-game/create-game";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    RegisterPage,
    ReduceNamePipe,
    InitialePipe,
    CreateTeamPage,
    CreateGamePage,
    CreatePlayerComponent,
    ManagePlayerComponent,
    DashboardHeaderComponent,
    DetailGameComponent,
    TeamDetailComponent,
    ListStatsComponent,
    StatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    DashboardPage,
    CreateTeamPage,
    CreateGamePage,
    StatPage,
    ListStatsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackStatProvider,
    StatService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptorService, multi: true }
  ]
})
export class AppModule {
}
