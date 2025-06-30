import { Component, signal, effect, OnInit, DestroyRef } from '@angular/core';
import { RecipesService } from '../../../core/services/recipes.service'; // adapte si nécessaire
import { toObservable } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrl: './search.scss',
  standalone: true,
})
export class Search {
  private recipesService = inject(RecipesService);

  searchTerm = signal('');
  destroyRef = inject(DestroyRef);

  constructor() {
    const search$ = toObservable(this.searchTerm);

    search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value.trim()) {
          this.recipesService.searchRecipes(value);
          this.recipesService.recipesResource.destroy(); 
        }
      });
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    
  }
}
