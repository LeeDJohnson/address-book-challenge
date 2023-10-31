import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const loadTotalUsersCount = createAction(
    '[User] Load Total Users Count'
);

export const loadTotalUsersCountSuccess = createAction(
    '[User] Load Total Users Count Success',
    props<{ userCount: number }>()
);

export const loadUsers = createAction(
    '[User] Load Users',
    props<{ offset: number; limit: number }>()
);


export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFail = createAction(
  '[User] Load Users Fail',
  props<{ error: any }>()
);

export const selectUser = createAction(
  '[User] Select User',
  props<{ selectedUserId: string }>() // or number, depending on your ID type
);
