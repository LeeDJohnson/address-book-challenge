import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { userActions, userSelectors } from '../../store';
import { User } from '../../store/models/user'; 
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class UserListComponent implements OnInit {
  users$?: Observable<User[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<any>;
  totalUsers$?: Observable<number>; 
  pageSize: number = 10;   // Default number of users per page
  pageIndex: number = 0;   // Default page index


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.fetchTotalUsersCount();
    this.fetchUsers();
    this.totalUsers$ = this.store.select(userSelectors.selectTotalUsersCount);
    this.users$ = this.store.select(userSelectors.selectAllUsers);
    this.loading$ = this.store.select(userSelectors.selectUserLoadingState);
    this.error$ = this.store.select(userSelectors.selectUserError);
  }
  
  fetchTotalUsersCount(): void {
    this.store.dispatch(userActions.loadTotalUsersCount());
  }

  fetchUsers(): void {
    const offset = this.pageIndex * this.pageSize;
    this.store.dispatch(userActions.loadUsers({ offset, limit: this.pageSize }));
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchUsers();
  }
}
