import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysubmissionsComponent } from './mysubmissions.component';

describe('MysubmissionsComponent', () => {
  let component: MysubmissionsComponent;
  let fixture: ComponentFixture<MysubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
