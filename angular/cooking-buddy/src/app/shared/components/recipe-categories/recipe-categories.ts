import { Component, Input, OnInit, signal, input } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes.service'; // ajuste le chemin selon ton projet
import type { Recipe } from "../../../core/models/recipe"; // ajuste ou crée ce modèle
import { computed, inject } from '@angular/core';


@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.html',
  styleUrls: ['./recipe-categories.scss']
})
export class RecipeCategoriesComponent {
  private recipesService = inject(RecipesService);

  categories = this.recipesService.categories;
  selectedCategory = this.recipesService.selectedCategory;

  selectCategory(category: string) {
    this.recipesService.setCategory(category);
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;
    this.selectCategory(category);
  }
}