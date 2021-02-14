let selectedCamera = localStorage.getItem("selectedProduct");

fetch("http://localhost:3000/api/cameras/" + selectedCamera)
  .then((product) => product.json())
  .then((product) => {
    document.getElementsByClassName("name")[0].innerHTML = product.name;
    document.getElementsByClassName("photo")[0].src = product.imageUrl;
    document.getElementsByClassName("price")[0].innerHTML = Intl.NumberFormat("de").format(product.price) + "€";
    document.getElementsByClassName("description")[0].innerHTML = product.description;

    insertLens(product.lenses);
    
    document.getElementsByClassName("add-to-cart")[0].addEventListener('click', event => {
      addToCart(product);
    });
});

function insertLens(lenses) {
  const cameraLens = document.getElementById("camera-lens");
  const lensesSelectElement = document.getElementById("lenses");

  for (let i = 0; i < lenses.length; i++) {
    const lensesOptionElement = document.createElement("option");
    lensesOptionElement.value = lenses[i];
    lensesOptionElement.textContent = lenses[i];
    lensesSelectElement.appendChild(lensesOptionElement);
  }
}

function addToCart(product) {
  let selectChoices = document.getElementById("lenses");
  let choiceLense = selectChoices.options[selectChoices.selectedIndex].value;
  let choice = { idProduct: product._id, choiceLense: choiceLense };
  let camerasInCart = [];

  if (localStorage.getItem("camerasInCart") !== null) {
    camerasInCart = JSON.parse(localStorage.getItem("camerasInCart"));
  }
  camerasInCart.push(choice);
  localStorage.setItem("camerasInCart", JSON.stringify(camerasInCart));
};
