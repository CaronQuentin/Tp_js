import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout';
import { RecipeCategoryComponent } from '../../../shared/components/recipe-category/recipe-category';
import { RecipeCategoriesComponent } from '../../../shared/components/recipe-categories/recipe-categories';
import { DetailedRecipeCardComponent } from '../../../shared/components/detailed-recipe-card/detailed-recipe-card';
import { Search } from '../../../shared/components/search/search';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  imports: [
    PageLayoutComponent,
    RecipeCategoryComponent,
    RecipeCategoriesComponent,
    Search
    
  ]
})
export class HomePage {

}
