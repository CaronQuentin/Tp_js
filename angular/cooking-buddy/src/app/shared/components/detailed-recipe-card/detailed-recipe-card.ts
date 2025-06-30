import { Component, inject, input } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes.service';

@Component({
  selector: 'app-detailed-recipe-card',
  templateUrl: './detailed-recipe-card.html',
  styleUrls: ['./detailed-recipe-card.scss']
})
export class DetailedRecipeCardComponent {
  private recipesService = inject(RecipesService);

  id = input.required<string>();
  name = input.required<string>();
  categorie = input.required<string>();
  img = input.required<string>();
  ingredient1 = input.required<string>();
  ingredient2 = input.required<string>();
  ingredient3 = input.required<string>();
  ingredient4 = input.required<string>();
  ingredient5 = input.required<string>();
  ingredient6 = input.required<string>();
  ingredient7 = input.required<string>();
  ingredient8 = input.required<string>();
  ingredient9 = input.required<string>();
  ingredient10 = input.required<string>();
  ingredient11 = input.required<string>();
  ingredient12 = input.required<string>();
  ingredient13 = input.required<string>();
  ingredient14 = input.required<string>();
  ingredient15 = input.required<string>();
  ingredient16 = input.required<string>();
  ingredient17 = input.required<string>();
  ingredient18 = input.required<string>();
  ingredient19 = input.required<string>();
  ingredient20 = input.required<string>();

}