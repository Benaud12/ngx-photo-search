import { Component } from '@angular/core';
import { Photo } from './services/photo/photo.model';
import { PhotoService } from './services/photo/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _photos: Photo[];

  constructor(private photoService: PhotoService) {
    this._photos = [];
  }

  get photos(): Photo[] {
    return this._photos;
  }

  fetchPhotos(): void {
    this.photoService.getAll().subscribe(
      photos => this._photos = photos,
      err => {}
    );
  }
}
