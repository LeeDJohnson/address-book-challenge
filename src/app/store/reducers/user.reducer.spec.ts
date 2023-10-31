import { Action } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { User } from '../models/user';
import { userReducer, initialState } from './user.reducer';

describe('UserReducer', () => {
  let getItemMock: jest.Mock;
  let setItemMock: jest.Mock;
  let clearMock: jest.Mock;
  let store: { [key: string]: any };

  beforeEach(() => {
    // Reset the mock store for each test
    store = {};

    getItemMock = jest.fn((key: string) => store[key] || null);
    setItemMock = jest.fn((key: string, value: string) => store[key] = value);
    clearMock = jest.fn(() => { store = {}; });

    // Mock the localStorage methods
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
        setItem: setItemMock,
        clear: clearMock,
      },
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });



  it('should return the default state', () => {
    const action = {} as Action;
    const state = userReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on loadUsers action', () => {
    const action = userActions.loadUsers({ offset: 0, limit: 10 });
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should populate users on loadUsersSuccess action', () => {
    const users = [{ id: '1', firstName: 'John', lastName: 'Doe', phone: '123-4567', imgURLLarge: 'www.image.com', imgURLMedium: 'www.image.com', imgURLThumbnail: 'www.image.com'}];
    const action = userActions.loadUsersSuccess({ users });
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.users).toEqual(users);
  });

  it('should set error on loadUsersFail action', () => {
    const error = 'Error';
    const action = userActions.loadUsersFail({ error });
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should select a user on selectUser action', () => {
    const users = [{ id: '1', firstName: 'John', lastName: 'Doe', phone: '123-4567', imgURLLarge: 'www.image.com', imgURLMedium: 'www.image.com', imgURLThumbnail: 'www.image.com'}];
    const modifiedState = { ...initialState, users };
    const action = userActions.selectUser({ selectedUserId: '1' });
    const state = userReducer(modifiedState, action);

    expect(state.selectedUser).toEqual(users[0]);
  });

  it('should set user count on loadTotalUsersCountSuccess action', () => {
    const userCount = 100;
    const action = userActions.loadTotalUsersCountSuccess({ userCount });
    const state = userReducer(initialState, action);

    expect(state.userCount).toBe(userCount);
  });
});

