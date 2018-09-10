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
  private _currentPage: number;
  private _photosPerPage: number;

  constructor(private photoService: PhotoService) {
    this._photos = [];
    this._currentPage = 1;
    this._photosPerPage = 10;
  }

  get photos(): Photo[] {
    return this._photos;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  get photosPerPage(): number {
    return this._photosPerPage;
  }

  get displayPhotos(): Photo[] {
    const startIndex = (this.currentPage - 1) * this.photosPerPage;
    const endIndex = startIndex + this.photosPerPage;
    return this.photos.slice(startIndex, endIndex);
  }

  fetchPhotos(): void {
    this.photoService.getAll().subscribe(
      photos => this._photos = photos,
      err => {}
    );
  }
}
