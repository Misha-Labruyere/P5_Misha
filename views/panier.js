let camerasInCart = JSON.parse(localStorage.getItem("camerasInCart"));

for (let i = 0; i < camerasInCart.length; i++) {

  let recupId = camerasInCart[i].idProduct;
  console.log(recupId);


  let emptyProduct = document.getElementById("empty-camera");
  let newCamera = emptyProduct.cloneNode(true);

  fetch("http://localhost:3000/api/cameras/" + recupId)
    .then((product) => product.json())
    .then((product) => {
      newCamera.getElementsByClassName("name")[0].innerHTML = product.name;
      newCamera.getElementsByClassName("price")[0].innerHTML = Intl.NumberFormat("de").format(product.price) + "€";
      newCamera.getElementsByClassName("description")[0].innerHTML = product.description;
      newCamera.getElementsByClassName("photo")[0].src = product.imageUrl;
      newCamera.getElementsByClassName("selected-lens")[0].innerHTML = camerasInCart[i].choiceLense;
    });

  
    document.getElementById("cameras-in-cart").appendChild(newCamera);

}


