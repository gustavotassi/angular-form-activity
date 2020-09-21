import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPersonComponent } from './insert-person.component';

describe('InsertPersonComponent', () => {
  let component: InsertPersonComponent;
  let fixture: ComponentFixture<InsertPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
