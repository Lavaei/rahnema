import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppEffects} from "./ngrx/app.effects";
import {ProjectComponent} from './project/project.component';
import {stepReducer, wizardReducer} from "./ngrx/app.reducers";
import {SettingsComponent} from './settings/settings.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {ReviewComponent} from './review/review.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    StoreModule.forRoot({wizard: wizardReducer, step: stepReducer}),
    EffectsModule.forRoot([AppEffects]),
  ],
  declarations: [
    AppComponent,
    ProjectComponent,
    SettingsComponent,
    DeliveryComponent,
    ReviewComponent,
  ],
  providers:    [],
  bootstrap:    [AppComponent]
})
export class AppModule
{
}
