import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { PhotoService } from './services/photo/photo.service';
import { Photo } from './services/photo/photo.model';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let mockPhotoService: any;

  beforeEach(async(() => {
    mockPhotoService = jasmine.createSpyObj('mockPhotoService', ['getAll']);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: PhotoService,
          useValue: mockPhotoService
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should have photos set to empty array by default', () => {
    expect(app.photos).toEqual([]);
  });

  describe('fetchPhotos', () => {
    it('should set photos property from the PhotoService response',
      fakeAsync(() => {
        const mockPhotos: Photo[] = [
          new Photo(1, 'mock-title1', 'mock-url1', 'mock-thumbnail1'),
          new Photo(1, 'mock-title2', 'mock-url2', 'mock-thumbnail2'),
        ];
        mockPhotoService.getAll.and.returnValue(of(mockPhotos));

        app.fetchPhotos();
        tick();

        expect(mockPhotoService.getAll).toHaveBeenCalled();
        expect(app.photos).toEqual(mockPhotos);
      }));

    it('should not set photos property when the PhotoService returns an error',
      fakeAsync(() => {
        mockPhotoService.getAll.and.returnValue(throwError('Some Error'));

        app.fetchPhotos();
        tick();

        expect(mockPhotoService.getAll).toHaveBeenCalled();
        expect(app.photos).toEqual([]);
      }));
  });
});
