/*********************************************************************************
*
* Recipe
*
/*********************************************************************************/

class Recipe {
    constructor(data) {
        this._id = data.id;
        this._image = data.image;
        this._name = data.name;
        this._servings = data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
    }

    // Method to display the ingredients
    displayIngredients() {
        return this._ingredients.map(ingredient => {
            const quantity = ingredient.quantity ? `: ${ingredient.quantity}` : '';
            const unit = ingredient.unit ? ` ${ingredient.unit}` : '';
            return `${ingredient.ingredient}${quantity}${unit}`;
        }).join(', ');
    }

    // Method to display the utensils
    displayUstensils() {
        return this._ustensils.join(', ');
    }

    // Method to display all recipe data
    displayRecipe() {
        console.log(`
            Name: ${this._name}
            ID: ${this._id}
            Image: ${this._image}
            Servings: ${this._servings}
            Ingredients: ${this.displayIngredients()}
            Preparation Time: ${this._time} minutes
            Description: ${this._description}
            Appliance: ${this._appliance}
            Utensils: ${this.displayUstensils()}
        `);
    }
}

// Export the Recipe class
export { Recipe };