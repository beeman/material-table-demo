
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiMaterialTableComponent } from './api-material-table.component';

describe('ApiMaterialTableComponent', () => {
  let component: ApiMaterialTableComponent;
  let fixture: ComponentFixture<ApiMaterialTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiMaterialTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
