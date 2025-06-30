import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryComponent } from './recipe-category';

describe('RecipeCategory', () => {
  let component: RecipeCategoryComponent;
  let fixture: ComponentFixture<RecipeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
