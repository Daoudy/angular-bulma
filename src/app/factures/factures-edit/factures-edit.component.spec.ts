import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturesEditComponent } from './factures-edit.component';

describe('FacturesEditComponent', () => {
  let component: FacturesEditComponent;
  let fixture: ComponentFixture<FacturesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
