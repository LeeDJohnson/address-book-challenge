import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import * as userActions from '../actions/user.actions';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service'


describe('UserEffects', () => {
  let effects: UserEffects;
  let actions$: Observable<any>;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    //@ts-expect-error
    userServiceMock = {
      getTotalUsersCount: jest.fn(),
      getUsers: jest.fn(),
      BASE_URL: "mock_base_url",
      SEED: "mock_seed",
      http: {} as HttpClient,  // or mock any methods if used elsewhere
      headers: {} as any,   
    };

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        { provide: UserService, useValue: userServiceMock }
      ]
    });

    effects = TestBed.inject(UserEffects);
  });

  describe('loadTotalUsersCount$', () => {
    it('should return loadTotalUsersCountSuccess action on success', (done) => {
      const userCount = 5;
      userServiceMock.getTotalUsersCount.mockReturnValue(of(userCount));
      actions$ = of(userActions.loadTotalUsersCount());

      effects.loadTotalUsersCount$.subscribe(action => {
        expect(action).toEqual(userActions.loadTotalUsersCountSuccess({ userCount }));
        done();
      });
    });
  });

  describe('loadUsers$', () => {
    it('should return loadUsersSuccess action on success', (done) => {
      const users = [{ id: '1', firstName: 'John', lastName: 'Doe', phone: '123-4567', imgURLLarge: 'www.image.com', imgURLMedium: 'www.image.com', imgURLThumbnail: 'www.image.com'}];
      const offset = 0;
      const limit = 10;
      userServiceMock.getUsers.mockReturnValue(of(users));
      actions$ = of(userActions.loadUsers({ offset, limit }));

      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(userActions.loadUsersSuccess({ users }));
        done();
      });
    });

    it('should return loadUsersFail action on error', (done) => {
      const error = new Error('Error loading users');
      userServiceMock.getUsers.mockReturnValue(throwError(error));
      const offset = 0;
      const limit = 10;
      actions$ = of(userActions.loadUsers({ offset, limit }));

      effects.loadUsers$.subscribe(action => {
        expect(action).toEqual(userActions.loadUsersFail({ error }));
        done();
      });
    });

    // ... additional tests for other edge cases.
  });
});
