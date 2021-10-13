import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureByMemberComponent } from './picture-by-member.component';

describe('PictureByMemberComponent', () => {
  let component: PictureByMemberComponent;
  let fixture: ComponentFixture<PictureByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
