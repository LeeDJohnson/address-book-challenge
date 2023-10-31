import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserDetailComponent } from './user-detail.component';
import { userActions, userSelectors } from '../../store';
import { Location } from '@angular/common';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockStore: any;
  let mockActivatedRoute: any;
  let mockLocation: any;

  beforeEach(async () => {
    mockStore = {
      dispatch: jest.fn(),
      pipe: jest.fn(),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn(),
        },
      },
    };

    mockLocation = {
      back: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch selectUser action with userId from route', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('123');
    fixture.detectChanges();

    expect(mockStore.dispatch).toHaveBeenCalledWith(userActions.selectUser({ selectedUserId: '123' }));
  });

  it('should select selectedUser, loading, and error from store on ngOnInit', () => {
    const mockSelectedUser$ = of({ id: '123', firstName: 'John', lastName: 'Doe' });
    const mockLoading$ = of(false);
    const mockError$ = of(null);

    mockStore.pipe.mockImplementationOnce(() => mockSelectedUser$)
      .mockImplementationOnce(() => mockLoading$)
      .mockImplementationOnce(() => mockError$);

    component.ngOnInit();

    expect(component.selectedUser$).toBe(mockSelectedUser$);
    expect(component.loading$).toBe(mockLoading$);
    expect(component.error$).toBe(mockError$);
  });

  it('should call location.back() on goBack', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
