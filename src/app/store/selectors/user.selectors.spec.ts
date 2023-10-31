
import { selectAllUsers, selectSelectedUser, selectUserLoadingState, selectUserError } from './user.selectors';
import { UserState } from '../reducers/user.reducer';

describe('UserSelectors', () => {
  const mockUser = { id: '1', firstName: 'John', lastName: 'Doe', phone: '123-4567', imgURLLarge: 'www.image.com', imgURLMedium: 'www.image.com', imgURLThumbnail: 'www.image.com'};
  const initialState: UserState = {
    userCount: 254,
    users: [mockUser],
    selectedUser: mockUser,
    loading: false,
    error: null
  };

  describe('selectAllUsers', () => {

    it('should select all users', () => {
      const result = selectAllUsers.projector(initialState);
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(mockUser);
    });

    it('should return an empty array when there are no users', () => {
      const noUsersState = { ...initialState, users: [] };
      const result = selectAllUsers.projector(noUsersState);
      expect(result.length).toBe(0);
    });

  });

  describe('selectSelectedUser', () => {

    it('should select the selected user', () => {
      const result = selectSelectedUser.projector(initialState);
      expect(result).toEqual(mockUser);
    });

    it('should return null when there is no selected user', () => {
      const noSelectedUserState = { ...initialState, selectedUser: null };
      const result = selectSelectedUser.projector(noSelectedUserState);
      expect(result).toBeNull();
    });

  });

  describe('selectUserLoadingState', () => {

    it('should select the loading state', () => {
      const result = selectUserLoadingState.projector(initialState);
      expect(result).toBe(false);
    });

    it('should return true when loading state is true', () => {
      const loadingState = { ...initialState, loading: true };
      const result = selectUserLoadingState.projector(loadingState);
      expect(result).toBe(true);
    });

  });

  describe('selectUserError', () => {

    it('should select the error state', () => {
      const result = selectUserError.projector(initialState);
      expect(result).toBeNull();
    });

    it('should return the error when there is an error state', () => {
      const errorState = { ...initialState, error: 'An error occurred' };
      const result = selectUserError.projector(errorState);
      expect(result).toBe('An error occurred');
    });
  });
});
