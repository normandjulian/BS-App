import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {LoginPage} from '../pages/login/login';
import {BackStatProvider} from "../providers/back-stat.provider";
import {IonicStorageModule} from '@ionic/storage';
import {HttpModule} from '@angular/http';
import {DashboardPage} from "../pages/dashboard/dashboard";
import {ReduceNamePipe} from "../pipes/reduce-name.pipe";
import {InitialePipe} from "../pipes/initiale.pipe";
import {TeamPage} from "../pages/team/team";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    ReduceNamePipe,
    InitialePipe,
    TeamPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    TeamPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackStatProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
