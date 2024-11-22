/*********************************************************************************
*
* Display Recipes Number
*
/*********************************************************************************/

import { Recipe } from "../models/recipe.js";
import { RecipeCard } from "../templates/recipeCard.js";

export function displayRecipes(dataArrow) {
    //console.log("Data received:", dataArrow); // Log data to check format

    if (!Array.isArray(dataArrow)) {
        // Check if dataArrow is a single Recipe object, then wrap it in an array
        if (dataArrow instanceof Recipe) {
            dataArrow = [dataArrow];
        } else {
            //console.error("Expected an array but received:", dataArrow);
            return; // Exit if dataArrow is not an array or Recipe instance
        }
    }

    const cardSection = document.querySelector("#section-recipes .container .row");
    cardSection.innerHTML = "";

    dataArrow.forEach(recipe => {
        const recipeCard = new RecipeCard(recipe);
        const modelRecipeCard = recipeCard.createRecipeCard();
        cardSection.appendChild(modelRecipeCard);
    });
}