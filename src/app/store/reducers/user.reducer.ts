import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { User } from '../models/user';


export interface UserState {
  userCount: number;
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  userCount: 0,
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};

const _userReducer = createReducer(
  initialState,

  on(userActions.loadUsers, state => ({ ...state, loading: true, error: null })),
  
  on(userActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),

  on(userActions.loadUsersFail, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(userActions.selectUser, (state, { selectedUserId }) => ({
    ...state,
    selectedUser: state.users.find(user => user.id === selectedUserId) || null
  })),

  on(userActions.loadTotalUsersCountSuccess, (state, { userCount }) => ({
    ...state,
    userCount
})),
);
function rehydrateReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const savedState = localStorage.getItem('userStateKey');
    const newState = savedState ? { ...state, ...JSON.parse(savedState) } : state;
    return reducer(newState, action);
  };
}


export const userReducer = rehydrateReducer(_userReducer);

export function saveToLocalStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const newState = reducer(state, action);
    localStorage.setItem('userStateKey', JSON.stringify(newState));
    return newState;
  };
}



