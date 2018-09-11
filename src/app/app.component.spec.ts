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
  let mockPhotos: Photo[];
  let photo1: Photo;
  let photo2: Photo;
  let photo3: Photo;
  let photo4: Photo;
  let photo5: Photo;
  let photo6: Photo;
  let photo7: Photo;
  let photo8: Photo;
  let photo9: Photo;
  let photo10: Photo;
  let photo11: Photo;
  let photo12: Photo;

  beforeEach(async(() => {
    photo1 = new Photo(1, 'mock-title1', 'mock-url1', 'mock-thumbnail1');
    photo2 = new Photo(2, 'mock-title2', 'mock-url2', 'mock-thumbnail2');
    photo3 = new Photo(3, 'mock-title3', 'mock-url3', 'mock-thumbnail3');
    photo4 = new Photo(4, 'mock-title4', 'mock-url4', 'mock-thumbnail4');
    photo5 = new Photo(5, 'mock-title5', 'mock-url5', 'mock-thumbnail5');
    photo6 = new Photo(6, 'mock-title6', 'mock-url6', 'mock-thumbnail6');
    photo7 = new Photo(7, 'mock-title7', 'mock-url7', 'mock-thumbnail7');
    photo8 = new Photo(8, 'mock-title8', 'mock-url8', 'mock-thumbnail8');
    photo9 = new Photo(9, 'mock-title9', 'mock-url9', 'mock-thumbnail9');
    photo10 = new Photo(10, 'mock-title10', 'mock-url10', 'mock-thumbnail10');
    photo11 = new Photo(11, 'mock-title11', 'mock-url11', 'mock-thumbnail11');
    photo12 = new Photo(12, 'mock-title12', 'mock-url12', 'mock-thumbnail12');
    mockPhotos = [
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      photo6,
      photo7,
      photo8,
      photo9,
      photo10,
      photo11,
      photo12,
    ];
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

  it('should have default values set correctly', () => {
    expect(app.photos).toEqual([]);
    expect(app.currentPage).toEqual(1);
    expect(app.photosPerPage).toEqual(10);
  });

  describe('fetchPhotos', () => {
    it('should set photos property from the PhotoService response',
      fakeAsync(() => {
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

  describe('displayPhotos', () => {
    it(`should return the relevant subset of photos based on the ` +
      `currentpage and photosPerPage (#1)`, () => {

        spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
        spyOnProperty(app, 'currentPage', 'get').and.returnValue(1);
        spyOnProperty(app, 'photosPerPage', 'get').and.returnValue(3);

        const expectedPhotos = [photo1, photo2, photo3];
        expect(app.displayPhotos).toEqual(expectedPhotos);
      });

    it(`should return the relevant subset of photos based on the ` +
      `currentpage and photosPerPage (#2)`, () => {

        spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
        spyOnProperty(app, 'currentPage', 'get').and.returnValue(3);
        spyOnProperty(app, 'photosPerPage', 'get').and.returnValue(2);

        const expectedPhotos = [photo5, photo6];
        expect(app.displayPhotos).toEqual(expectedPhotos);
      });

    it(`should return the relevant subset of photos based on the ` +
      `currentpage and photosPerPage (#3)`, () => {

        spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
        spyOnProperty(app, 'currentPage', 'get').and.returnValue(2);
        spyOnProperty(app, 'photosPerPage', 'get').and.returnValue(5);

        const expectedPhotos = [photo6, photo7, photo8, photo9, photo10];
        expect(app.displayPhotos).toEqual(expectedPhotos);
      });
  });

  describe('nextPage', () => {
    it('shoud increment the currentPage by 1', () => {
      spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
      spyOnProperty(app, 'photosPerPage', 'get').and.returnValue(2);
      app.nextPage();
      expect(app.currentPage).toEqual(2);
      app.nextPage();
      expect(app.currentPage).toEqual(3);
    });

    it('should not increment if already on last page (based on photos ' +
      'and photosPerPage)', () => {
        spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
        spyOnProperty(app, 'photosPerPage', 'get').and.returnValue(3);
        app.nextPage();
        app.nextPage();
        app.nextPage();
        expect(app.currentPage).toEqual(4);
        app.nextPage();
        expect(app.currentPage).toEqual(4);
      });
  });

  describe('previousPage', () => {
    it('shoud decrement the currentPage by 1', () => {
      spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
      spyOnProperty(app, 'photosPerPage', 'get').and.returnValue(2);
      app.nextPage();
      app.nextPage();
      expect(app.currentPage).toEqual(3);
      app.previousPage();
      expect(app.currentPage).toEqual(2);
      app.previousPage();
      expect(app.currentPage).toEqual(1);
    });

    it('should not decrement if on the first page', () => {
        spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
        spyOnProperty(app, 'photosPerPage', 'get').and.returnValue(3);
        app.nextPage();
        expect(app.currentPage).toEqual(2);
        app.previousPage();
        expect(app.currentPage).toEqual(1);
        app.previousPage();
        expect(app.currentPage).toEqual(1);
      });
  });

  describe('firstDisplayedIndex', () => {
    it('should return the first displayedPhoto position in the photos array',
      () => {
        const displayedPhotos = [photo4, photo5, photo6];
        spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
        spyOnProperty(app, 'displayPhotos', 'get')
          .and.returnValue(displayedPhotos);

        expect(app.firstDisplayedPosition).toEqual(4);
      });
  });

  describe('lastDisplayedPosition', () => {
    it('should return the last displayedPhoto position in the photos array',
      () => {
        const displayedPhotos = [photo4, photo5, photo6];
        spyOnProperty(app, 'photos', 'get').and.returnValue(mockPhotos);
        spyOnProperty(app, 'displayPhotos', 'get')
          .and.returnValue(displayedPhotos);

        expect(app.lastDisplayedPosition).toEqual(6);
      });
  });
});
