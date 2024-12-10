/*********************************************************************************
*
* Recipe Card
*
/*********************************************************************************/

// Class representing a Recipe Card
class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
    }

    createIngredientsList() {
        // Check ingredients structure
        if (!this.recipe.ingredients || !Array.isArray(this.recipe.ingredients)) {
            console.error("Problem with the recipe ingredients", this.recipe);
            return ''; // Return an empty string if missing or incorrect
        }

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('list-group', 'p-0', 'm-0');

        this.recipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.classList.add('d-flex', 'justify-content-between');

            const ingredientName = document.createElement('span');
            ingredientName.textContent = ingredient.ingredient || 'Unknown'; // Default value
            ingredientName.classList.add('recipe-card__ingredient');

            const ingredientQuantity = document.createElement('span');
            ingredientQuantity.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''}`;
            ingredientQuantity.classList.add('recipe-card__ingredient-quantity');

            listItem.appendChild(ingredientName);
            listItem.appendChild(ingredientQuantity);
            ingredientsList.appendChild(listItem);
        });

        return ingredientsList;
    }

    createRecipeCard() {
        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'd-flex', 'flex-column', 'shadow', 'rounded-4', 'overflow-hidden');

        const img = document.createElement('img');
        img.src = `img/recettes/${this.recipe.image || 'placeholder.png'}`;
        img.classList.add('card-img-top');
        img.alt = this.recipe.name || 'Recipe image';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'flex-grow-1', 'mt-4', 'p-4');

        const recipeTitle = document.createElement('h2');
        recipeTitle.classList.add('card-title', 'mb-5');
        recipeTitle.textContent = this.recipe.name || 'Recipe Name';

        const descriptionTitle = document.createElement('h3');
        descriptionTitle.classList.add('mb-4');
        descriptionTitle.textContent = 'Recette';

        const description = document.createElement('p');
        description.classList.add('card-text', 'mb-5');
        description.textContent = this.recipe.description || 'No description available.';

        const duration = document.createElement('span');
        duration.classList.add('card-text', 'text-muted', 'badge', 'rounded-pill', 'bg-primary', 'recipe-card__duration');
        duration.textContent = this.recipe.time ? `${this.recipe.time} min` : '';
        if (!this.recipe.time) duration.style.display = 'none';

        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.classList.add('mb-4');
        ingredientsTitle.textContent = 'Ingredients';

        const ingredientsList = this.createIngredientsList();

        cardBody.appendChild(recipeTitle);
        cardBody.appendChild(descriptionTitle);
        cardBody.appendChild(description);
        cardBody.appendChild(ingredientsTitle);
        cardBody.appendChild(ingredientsList);

        card.appendChild(duration);
        card.appendChild(img);
        card.appendChild(cardBody);

        const columnDiv = document.createElement('div');
        columnDiv.classList.add('col-12', 'col-md-4', 'mb-5', 'gx-5');
        columnDiv.appendChild(card);

        return columnDiv;
    }
}

export {
    RecipeCard
};