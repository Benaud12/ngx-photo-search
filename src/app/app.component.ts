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

  get firstDisplayedPosition(): number {
    return this.photos.indexOf(this.displayPhotos[0]) + 1;
  }

  get lastDisplayedPosition(): number {
    return this.photos.indexOf(this.displayPhotos.slice(-1)[0]) + 1;
  }

  public fetchPhotos(): void {
    this.photoService.getAll().subscribe(
      photos => this._photos = photos,
      err => {}
    );
  }

  public nextPage(): void {
    if (this.isLastPage()) {
      return;
    }
    this._currentPage++;
  }

  public previousPage(): void {
    if (this.currentPage === 1) {
      return;
    }
    this._currentPage--;
  }

  private isLastPage(): boolean {
    return this.currentPage === this.lastPage();
  }

  private lastPage(): number {
    const additonal = (this.photos.length % this.photosPerPage) === 0 ? 0 : 1;
    return Math.floor(this.photos.length / this.photosPerPage) + additonal;
  }
}
