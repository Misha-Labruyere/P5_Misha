let camerasInCart = JSON.parse(localStorage.getItem("camerasInCart"));
console.log(camerasInCart)

for (let i = 0; i < camerasInCart.length; i++) {

  let idCameraInCart = camerasInCart.idProduct;
  let emptyProduct = document.getElementById("empty-camera");
  let newCamera = emptyProduct.cloneNode(true);

  fetch("http://localhost:3000/api/cameras/")
    .then((product) => product.json())
    .then((product) => {
      newCamera.getElementsByClassName("name")[0].innerHTML = product[i].name;
      newCamera.getElementsByClassName("price")[0].innerHTML =
        Intl.NumberFormat("de").format(product[i].price) + "€";
      newCamera.getElementsByClassName(
        "description"
      )[0].innerHTML = product[i].description;
      newCamera.getElementsByClassName("photo")[0].src = product[i].imageUrl;
    });
}
