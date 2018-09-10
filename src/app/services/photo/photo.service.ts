import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from './photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = 'http://jsonplaceholder.typicode.com';
  }

  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.endpoint}/photos`);
  }
}
