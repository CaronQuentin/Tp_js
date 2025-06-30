import { Component, input } from '@angular/core';
import type { Recipe } from '../../../core/models/recipe';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss'
})
export class RecipeCardComponent {
  name = input.required<string>();
  img = input.required<string>();
  id = input.required<string>();


}
