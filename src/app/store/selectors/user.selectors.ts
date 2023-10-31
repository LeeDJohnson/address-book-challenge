import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectTotalUsersCount = createSelector(
  selectUserState,
  (userState: UserState) => userState.userCount
);

export const selectAllUsers = createSelector(
    selectUserState,
    (userState: UserState) => userState.users
);

export const selectSelectedUser = createSelector(
    selectUserState,
    (userState: UserState) => userState.selectedUser
);

export const selectUserLoadingState = createSelector(
    selectUserState,
    (userState: UserState) => userState.loading
);

export const selectUserError = createSelector(
    selectUserState,
    (userState: UserState) => userState.error
);
