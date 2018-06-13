
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMaterialTableComponent } from './dynamic-material-table.component';

describe('DynamicMaterialTableComponent', () => {
  let component: DynamicMaterialTableComponent;
  let fixture: ComponentFixture<DynamicMaterialTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicMaterialTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
