import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TableModule} from "primeng/table";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FakeInterceptor} from "./fake.interceptor";
import {AppEffects} from "./ngrx/app.effects";
import {ProjectComponent} from './project/project.component';
import {stepReducer, wizardReducer} from "./ngrx/app.reducers";
import {SettingsComponent} from './settings/settings.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {ReviewComponent} from './review/review.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CheckboxesComponent} from './checkboxes/checkboxes.component';

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    TableModule,
    StoreModule.forRoot({wizard: wizardReducer, step: stepReducer}),
    EffectsModule.forRoot([AppEffects]),
  ],
  declarations: [
    AppComponent,
    ProjectComponent,
    SettingsComponent,
    DeliveryComponent,
    ReviewComponent,
    CheckboxesComponent,
  ],
  providers:    [
    {provide: HTTP_INTERCEPTORS, useClass: FakeInterceptor, multi: true},
  ],
  bootstrap:    [AppComponent]
})
export class AppModule
{
}
