import { Component, inject } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes.service';

@Component({
  selector: 'app-recipe-filter',
  imports: [],
  templateUrl: './recipe-filter.html',
  styleUrl: './recipe-filter.scss'
})
export class RecipeFilter {
private recipesService = inject(RecipesService);


  recipes = this.recipesService.searchResults;
  

}
