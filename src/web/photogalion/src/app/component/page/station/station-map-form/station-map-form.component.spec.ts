import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationMapFormComponent } from './station-map-form.component';

describe('StationMapFormComponent', () => {
  let component: StationMapFormComponent;
  let fixture: ComponentFixture<StationMapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationMapFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationMapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
