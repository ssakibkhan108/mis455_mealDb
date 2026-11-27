function connect() {
    var searchTerm = document.getElementById("searchBox").value.trim();

    if (searchTerm === "") {
        alert("Please enter a meal name to search.");
        return;
    }

    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => display(data));
}

function display(data) {
    var oldContent = document.getElementById("displayArea");
    oldContent.textContent = " ";

    if (!data.meals) {
        oldContent.innerHTML = `<p class="status-msg">No meals found for your search. Try another keyword!</p>`;
        return;
    }

   
    var limit = Math.min(data.meals.length, 5);

    for (var i = 1; i <= limit; i++) {
        var meal = data.meals[i - 1];
        var newDiv = document.createElement("div");
        newDiv.classList.add("innerStyle");
        newDiv.innerHTML = `
            Meal Title: <b>${meal.strMeal}</b>
            <br>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <br>
            <p class="meal-details">Category: ${meal.strCategory} | Origin: ${meal.strArea}</p>
        `;
        oldContent.appendChild(newDiv);
    }
}