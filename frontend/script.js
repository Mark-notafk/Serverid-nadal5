const recipeContainer = document.getElementById("recipeContainer");
const newRecipeBtn = document.getElementById("newRecipeBtn");

const API_URL = "https://serverid-nadal5.onrender.com/random";

async function getRandomRecipe() {

    const response = await fetch(API_URL);

    const recipe = await response.json();

    const ingredientsList = recipe.ingredients
        .map(item => `<li>${item}</li>`)
        .join("");

    recipeContainer.innerHTML = `
        <h2>${recipe.name}</h2>

        <img src="${recipe.imageURL}" alt="${recipe.name}">

        <h3>Ingredients:</h3>

        <ul>
            ${ingredientsList}
        </ul>
    `;
}

getRandomRecipe();

newRecipeBtn.addEventListener("click", () => {
    getRandomRecipe();
});