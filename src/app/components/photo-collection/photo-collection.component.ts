import { Component, Input } from '@angular/core';
import { Photo } from '../../services/photo/photo.model';

@Component({
  selector: 'app-photo-collection',
  templateUrl: './photo-collection.component.html',
  styleUrls: ['./photo-collection.component.scss']
})
export class PhotoCollectionComponent {
  @Input()
  public photos: Photo[];
}
