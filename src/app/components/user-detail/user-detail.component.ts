import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { userActions, userSelectors } from '../../store';

import { User } from '../../store/models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  selectedUser$?: Observable<User | null>;
  loading$?: Observable<boolean>;
  error$?: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private location: Location 
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.store.dispatch(userActions.selectUser({ selectedUserId: userId }));
    }
    this.selectedUser$ = this.store.pipe(select(userSelectors.selectSelectedUser));
    this.loading$ = this.store.pipe(select(userSelectors.selectUserLoadingState));
    this.error$ = this.store.pipe(select(userSelectors.selectUserError));
  }

  goBack(): void {
    this.location.back();
  }
}
