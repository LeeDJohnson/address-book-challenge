import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListComponent } from '../components/user-list/user-list.component';
import { UserDetailComponent } from '../components/user-detail/user-detail.component';

import { UserRoutingModule } from './user-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
})
export class UserModule { }
