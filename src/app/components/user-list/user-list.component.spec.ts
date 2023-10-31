import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { userActions, userSelectors } from '../../store';
import { MatPaginatorModule } from '@angular/material/paginator';


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      dispatch: jest.fn(),
      select: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [MatPaginatorModule],
      providers: [
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTotalUsersCount and loadUsers actions on init', () => {
    component.ngOnInit();

    expect(mockStore.dispatch).toHaveBeenCalledWith(userActions.loadTotalUsersCount());
    expect(mockStore.dispatch).toHaveBeenCalledWith(userActions.loadUsers({ offset: 0, limit: component.pageSize }));
  });

  it('should select users, loading, error, and totalUsers from store on init', () => {
    const mockUsers$ = of([{ id: '123', firstName: 'John', lastName: 'Doe' }]);
    const mockLoading$ = of(false);
    const mockError$ = of(null);
    const mockTotalUsers$ = of(1000);

    //@ts-expect-error
    mockStore.select.mockImplementation((selector) => {
      if (selector === userSelectors.selectAllUsers) return mockUsers$;
      if (selector === userSelectors.selectUserLoadingState) return mockLoading$;
      if (selector === userSelectors.selectUserError) return mockError$;
      if (selector === userSelectors.selectTotalUsersCount) return mockTotalUsers$;
    });

    component.ngOnInit();

    expect(component.users$).toBe(mockUsers$);
    expect(component.loading$).toBe(mockLoading$);
    expect(component.error$).toBe(mockError$);
    expect(component.totalUsers$).toBe(mockTotalUsers$);
  });

  it('should handle onPageChange and fetch users based on new page index and size', () => {
    const mockPageEvent = {
      pageIndex: 2,
      pageSize: 20,
      length: 1000
    };

    component.onPageChange(mockPageEvent);

    expect(component.pageIndex).toBe(2);
    expect(component.pageSize).toBe(20);
    expect(mockStore.dispatch).toHaveBeenCalledWith(userActions.loadUsers({ offset: 40, limit: 20 }));
  });
});
