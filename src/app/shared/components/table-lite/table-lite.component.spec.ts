import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLiteComponent } from './table-lite.component';

describe('TableLiteComponent', () => {
  let component: TableLiteComponent;
  let fixture: ComponentFixture<TableLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
