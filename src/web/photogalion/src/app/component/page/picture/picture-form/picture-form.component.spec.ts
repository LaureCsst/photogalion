import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureFormComponent } from './picture-form.component';

describe('PictureFormComponent', () => {
  let component: PictureFormComponent;
  let fixture: ComponentFixture<PictureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
