import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { Photo } from './photo.model';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PhotoService ]
    });
    service = TestBed.get(PhotoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAll', () => {
    it('should get all photos', () => {
      const mockPhotos: Photo[] = [
        new Photo(1, 'mock-title1', 'mock-url1', 'mock-thumbnail1'),
        new Photo(1, 'mock-title2', 'mock-url2', 'mock-thumbnail2'),
      ];

      service.getAll().subscribe((photos: Photo[]) => {
        expect(photos).toEqual(mockPhotos);
      });

      const req: TestRequest =
        httpMock.expectOne('http://jsonplaceholder.typicode.com/photos');
      expect(req.request.method).toEqual('GET');

      req.flush(mockPhotos);
    });

    it('should return an error when the API call errors', () => {
      service.getAll().subscribe(
        (data: any) => { throw new Error('getAll call should not succeed'); },
        (err: any) => expect(err.status).toEqual(500));

      const req: TestRequest =
        httpMock.expectOne('http://jsonplaceholder.typicode.com/photos');

      req.flush({}, { status: 500, statusText: 'Error' });
    });
  });
});
