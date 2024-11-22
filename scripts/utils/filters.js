/*********************************************************************************
*
* Filters
* 
*
/*********************************************************************************/

// Import helper functions for displaying recipes, error messages, and recipe counts
import { displayErrorMessage } from "./displayErrorMessage.js";
import { displayRecipes } from "./displayRecipes.js";
import { displayRecipesNumber } from "./displayRecipesNumber.js";

// Main function to filter recipes
export function filterRecipes(recipes, filterOptions) {
    // Extract values from the filter options
    const { searchbarText, filters } = filterOptions;
    const { selectedIngredients, selectedAppliances, selectedUstensils } = filters;

    // Create a case-insensitive search pattern using the search text
    const regex = new RegExp(searchbarText, "gi");

    // Initialize an empty array to store the filtered recipes
    const filteredRecipes = [];

    // Remove any existing error message
    const errorMessage = document.querySelector(".error-message");
    if (errorMessage) errorMessage.remove();

    // If no filters are applied, show all recipes
    if (!searchbarText && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0) {
        // Trigger a custom event to update dropdowns with all recipes
        const newFilterRecipes = new CustomEvent("new-filter", { detail: recipes });
        document.getElementById("dropdownIngredients").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdownAppareils").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdownUstensiles").dispatchEvent(newFilterRecipes);

        // Display all recipes and update the count
        displayRecipes(recipes);
        displayRecipesNumber(recipes);
        return; // Exit the function
    }

    // Loop through each recipe to check if it matches the filters
    for (let recipe of recipes) {
        // Assume the recipe matches all filters initially
        let matchSearchBar = true;
        let matchIngredients = true;
        let matchAppliances = true;
        let matchUstensils = true;

        // Check if the recipe matches the search text
        if (searchbarText) {
            matchSearchBar = false; // Default to no match
            // Check if the recipe name, description, or ingredients match the search text
            if (
                regex.test(recipe.name) ||
                regex.test(recipe.description) ||
                recipe.ingredients.some(ing => regex.test(ing.ingredient))
            ) {
                matchSearchBar = true;
            }
        }

        // Check if the recipe matches the selected appliance
        if (selectedAppliances.length > 0) {
            matchAppliances = selectedAppliances.some(
                appliance => recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
            );
        }

        // Check if the recipe matches all selected ingredients
        if (selectedIngredients.length > 0) {
            matchIngredients = selectedIngredients.every(selectedIng =>
                recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase().includes(selectedIng.toLowerCase()))
            );
        }

        // Check if the recipe matches all selected ustensils
        if (selectedUstensils.length > 0) {
            const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
            matchUstensils = selectedUstensils.every(ustensil =>
                recipeUstensils.includes(ustensil.toLowerCase())
            );
        }

        // If the recipe matches all filters, add it to the filtered list
        if (matchSearchBar && matchIngredients && matchAppliances && matchUstensils) {
            filteredRecipes.push(recipe);
        }
    }

    // Display filtered recipes or show an error if none match
    if (filteredRecipes.length > 0) {
        // Trigger a custom event to update dropdowns with filtered recipes
        const newFilterRecipes = new CustomEvent("new-filter", { detail: filteredRecipes });
        document.getElementById("dropdownIngredients").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdownAppareils").dispatchEvent(newFilterRecipes);
        document.getElementById("dropdownUstensiles").dispatchEvent(newFilterRecipes);

        // Display the filtered recipes and update the count
        displayRecipes(filteredRecipes);
        displayRecipesNumber(filteredRecipes);
    } else {
        // If no recipes match, show an error and update the count to 0
        displayErrorMessage(searchbarText);
        displayRecipesNumber([]);
    }
}
