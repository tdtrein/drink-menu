document.addEventListener("DOMContentLoaded", () => {

  let currentlyOpenDrink = null;

  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modal-close");
  const menu = document.getElementById("menu");

  if (!modal || !modalClose || !menu) {
    console.error("❌ Required HTML elements not found");
    return;
  }

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.add("hidden");
    currentlyOpenDrink = null;
  }

  fetch("drinks.json")
    .then(response => response.json())
    .then(data => {
      for (const category in data) {
        const h2 = document.createElement("h2");
        h2.textContent = category;
        menu.appendChild(h2);

        data[category].forEach(drink => {
          const div = document.createElement("div");
          div.className = "drink";
          div.textContent = drink.name;

          div.addEventListener("click", () => {
            showDrink(drink);
          });

          menu.appendChild(div);
        });
      }
    })
    .catch(err => console.error("❌ JSON load error:", err));

  function showDrink(drink) {
    const title = document.getElementById("detail-title");
    const image = document.getElementById("detail-image");
    const description = document.getElementById("detail-description");
    const ingredientsList = document.getElementById("detail-ingredients");
    const ingredientsTitle = document.getElementById("ingredients-title");
    const emptyMessage = document.getElementById("detail-empty");

    if (currentlyOpenDrink === drink.name) {
      closeModal();
      return;
    }

    currentlyOpenDrink = drink.name;
    modal.classList.remove("hidden");

    ingredientsList.innerHTML = "";
    emptyMessage.style.display = "none";

    title.textContent = drink.name;

    if (drink.image) {
      image.src = drink.image;
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }

    if (drink.description) {
      description.textContent = drink.description;
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }

    if (drink.ingredients && drink.ingredients.length > 0) {
      ingredientsTitle.style.display = "block";
      drink.ingredients.forEach(i => {
        const li = document.createElement("li");
        li.textContent = i;
        ingredientsList.appendChild(li);
      });
    } else {
      ingredientsTitle.style.display = "none";
    }

    if (
      !drink.image &&
      !drink.description &&
      (!drink.ingredients || drink.ingredients.length === 0)
    ) {
      emptyMessage.style.display = "block";
    }
  }

});


