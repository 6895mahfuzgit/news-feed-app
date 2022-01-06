import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TopMenuBarComponent } from './top-menu-bar/top-menu-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ItemListComponent } from './item-list/item-list.component';
import { SafeURLPipe } from './../_pipes/safe.pipe.';
import { UiControlsModule } from './../_modules/ui-controls/ui-controls.module';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuBarComponent,
    FooterComponent,
    ItemListComponent,
    SafeURLPipe,
    PopupDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiControlsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
