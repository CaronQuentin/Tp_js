import { Component, Input, OnInit, signal, input } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes.service'; // ajuste le chemin selon ton projet
import type { Recipe } from "../../../core/models/recipe"; // ajuste ou crée ce modèle
import { computed, inject } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card'; // ajuste le chemin selon ton projet


@Component({
  selector: 'app-recipe-category',
  templateUrl: './recipe-category.html',
  styleUrls: ['./recipe-category.scss'],
  imports: [RecipeCardComponent]
})

export class RecipeCategoryComponent implements OnInit {
 category = input<string>();

  private recipesService = inject(RecipesService);

  // On crée une vue locale de la resource
  recipes = this.recipesService.recipesResource.value;

  ngOnInit(): void {
    const category = this.category();
    if (category) {
      this.recipesService.setCategory(category);
    }
  }
}