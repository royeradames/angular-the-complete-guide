import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'a Test Recipe',
      'This is simply a test',
      'https://s23209.pcdn.co/wp-content/uploads/2021/11/211015_DAMN-DELICIOUS_Herb-Roasted-Turkey-Breast_375-480x720.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
