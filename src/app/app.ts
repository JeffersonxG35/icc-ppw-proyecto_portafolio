import { Component } from '@angular/core';
import { AppHeaderComponent } from './components/app-header/app-header';
import {  AppHeroComponent } from './components/app-hero/app-hero';
import { RouterOutlet } from "@angular/router";
import { AppFooterComponent } from './components/app-footer/app-footer';

@Component({
  selector: 'aplicacion',
  imports: [AppHeaderComponent, AppHeroComponent, AppFooterComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'ppw-angular-21';
}