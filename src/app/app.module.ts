import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PhotoService } from './services/photo/photo.service';
import { PhotoCollectionComponent } from './components/photo-collection/photo-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoCollectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
