import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
  }

  ngOnDestroy(): void {
    this.recipeService.recipeChanged.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
