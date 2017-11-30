import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturesStartComponent } from './factures-start.component';

describe('FacturesStartComponent', () => {
  let component: FacturesStartComponent;
  let fixture: ComponentFixture<FacturesStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturesStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturesStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
