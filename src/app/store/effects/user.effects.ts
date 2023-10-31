import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';  // Import `of` instead of `EMPTY` since we're returning an array of actions.
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as userActions from '../actions/user.actions';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/user';

@Injectable()
export class UserEffects {

  loadTotalUsersCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadTotalUsersCount),
      mergeMap(() =>
        this.userService.getTotalUsersCount().pipe(
          map(userCount => userActions.loadTotalUsersCountSuccess({ userCount })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUsers),
    mergeMap((action) => this.userService.getUsers(action.offset, action.limit)
      .pipe(
        map(users => userActions.loadUsersSuccess({ users })),
        catchError(error => [userActions.loadUsersFail({ error })])
      )
    )
  ));


  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
