/*********************************************************************************
*
* Display Recipes Number
*
/*********************************************************************************/

export function displayRecipesNumber(array) {
	const recipesNumber = document.querySelector(".recipes-number");

	// Vérifiez que l'élément existe avant de définir son contenu
	if (recipesNumber) {
		recipesNumber.textContent = `${array.length} recettes`;
		//console.log('Nombre de recettes affiché:', array.length);
	} else {
		recipesNumber.textContent = 0;
		//console.error("L'élément .recipes-number n'a pas été trouvé dans le DOM.");
	}
}