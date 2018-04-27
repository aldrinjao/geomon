import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysubscriptionsComponent } from './mysubscriptions.component';

describe('MysubscriptionsComponent', () => {
  let component: MysubscriptionsComponent;
  let fixture: ComponentFixture<MysubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
