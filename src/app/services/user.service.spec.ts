import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users with correct headers and transform response', () => {
    const mockResponse = {
      results: [
        {
          login: { uuid: '1' },
          name: { first: 'John', last: 'Doe' },
          phone: '1234567890',
          picture: { large: 'test.jpg' }
        }
      ]
    };

    service.getUsers(1, 10).subscribe(users => {
      expect(users.length).toBe(1);
      const user = users[0];
      expect(user.id).toBe('1');
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.phone).toBe('1234567890');
      expect(user.imgURLLarge).toBe('test.jpg');
    });

    const request = httpMock.expectOne(req => req.url.includes(`${environment.BASE_URL}?seed=${environment.SEED}&results=10&page=2`));
    request.flush(mockResponse);
  });

  it('should fetch total users count and return 2000', () => {
    service.getTotalUsersCount().subscribe(count => {
      expect(count).toBe(2000);
    });

    const request = httpMock.expectOne(`${environment.BASE_URL}?seed=${environment.SEED}&results=0`);
    request.flush({});
  });
});
