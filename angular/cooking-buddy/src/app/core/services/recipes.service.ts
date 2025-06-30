import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private http = inject(HttpClient);

  categories = signal<string[]>([]);
  selectedCategory = signal<string>('Beef');

  recipesResource = resource({
    params: () => ({category : this.selectedCategory()}),
    loader: ({params}) => firstValueFrom(this.http.get<{ meals: any[] }>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
  ))}
  );

  constructor() {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.http
      .get<{ categories: { strCategory: string }[] }>(
        'https://www.themealdb.com/api/json/v1/1/categories.php'
      )
      .subscribe((res) => {
        const all = res.categories.map((cat) => cat.strCategory);
        this.categories.set(all);
      });
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  searchResults = signal<any[] | null>(null);

searchRecipes(query: string) {
  if (!query) {
    this.searchResults.set(null);
    return;
  }
  console.log('Searching for:', query);
    this.http
    .get<{ meals: any[] | null }>( // ✅ bon typage
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    )
    .subscribe((res) => {
      this.searchResults.set(res.meals ?? []);
    });
  console.log('Search results:', this.searchResults());
}
}