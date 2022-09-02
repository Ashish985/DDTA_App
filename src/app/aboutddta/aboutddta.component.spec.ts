import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutddtaComponent } from './aboutddta.component';

describe('AboutddtaComponent', () => {
  let component: AboutddtaComponent;
  let fixture: ComponentFixture<AboutddtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutddtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutddtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
