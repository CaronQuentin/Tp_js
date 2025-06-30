import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRecipeCardComponent } from './detailed-recipe-card';

describe('DetailedRecipeCard', () => {
  let component: DetailedRecipeCardComponent;
  let fixture: ComponentFixture<DetailedRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedRecipeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
