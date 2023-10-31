import { User } from '../models/user';
import * as userActions from './user.actions';

describe('User Actions', () => {

  describe('loadTotalUsersCount', () => {
    it('should create an action', () => {
      const action = userActions.loadTotalUsersCount();
      expect(action.type).toBe('[User] Load Total Users Count');
    });
  });

  describe('loadTotalUsersCountSuccess', () => {
    it('should create an action with payload', () => {
      const payload = { userCount: 5 };
      const action = userActions.loadTotalUsersCountSuccess(payload);
      expect(action.type).toBe('[User] Load Total Users Count Success');
      expect(action.userCount).toEqual(payload.userCount);
    });
  });

  describe('loadUsers', () => {
    it('should create an action with payload', () => {
      const payload = { offset: 0, limit: 10 };
      const action = userActions.loadUsers(payload);
      expect(action.type).toBe('[User] Load Users');
      expect(action.offset).toEqual(payload.offset);
      expect(action.limit).toEqual(payload.limit);
    });
  });

  describe('loadUsersSuccess', () => {
    it('should create an action with payload', () => {
      const userMock = [{ id: '1', firstName: 'John', lastName: 'Doe', phone: '123-4567', imgURLLarge: 'www.image.com', imgURLMedium: 'www.image.com', imgURLThumbnail: 'www.image.com'}];
      const action = userActions.loadUsersSuccess({ users: userMock });
      expect(action.type).toBe('[User] Load Users Success');
      expect(action.users).toEqual(userMock);
    });
  });

  describe('loadUsersFail', () => {
    it('should create an action with payload', () => {
      const error = 'Error message';
      const action = userActions.loadUsersFail({ error });
      expect(action.type).toBe('[User] Load Users Fail');
      expect(action.error).toEqual(error);
    });
  });

  describe('selectUser', () => {
    it('should create an action with payload', () => {
      const selectedUserId = '12345';
      const action = userActions.selectUser({ selectedUserId });
      expect(action.type).toBe('[User] Select User');
      expect(action.selectedUserId).toEqual(selectedUserId);
    });
  });

});
