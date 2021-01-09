let camerasInCart = JSON.parse(localStorage.getItem("camerasInCart"));

for (let i = 0; i < camerasInCart.length; i++) {
  let idCameraInCart = camerasInCart[i].idProduct;

  fetch("http://localhost:3000/api/cameras/" + idCameraInCart)
    .then((product) => product.json())
    .then((product) => {
      if (!document.getElementById("camera-" + camerasInCart[i].idProduct + camerasInCart[i].choiceLense)) {

        let emptyProduct = document.getElementById("empty-camera");

        var newCamera = emptyProduct.cloneNode(true);

        newCamera.setAttribute("id", "camera-" + camerasInCart[i].idProduct + camerasInCart[i].choiceLense);
        newCamera.getElementsByClassName("name")[0].innerHTML = product.name;
        newCamera.getElementsByClassName("price")[0].innerHTML =Intl.NumberFormat("de").format(product.price) + "€";
        newCamera.getElementsByClassName("description")[0].innerHTML =product.description;
        newCamera.getElementsByClassName("photo")[0].src = product.imageUrl;
        newCamera.getElementsByClassName("selected-lens")[0].innerHTML =camerasInCart[i].choiceLense;
        newCamera.querySelector(".product-count").innerHTML = 1;

        document.getElementById("cameras-in-cart").appendChild(newCamera);
      } 
      
      else {
        let targetCameraElement = document.getElementById("camera-" + camerasInCart[i].idProduct + camerasInCart[i].choiceLense);
        let countNumber = parseInt(targetCameraElement.querySelector(".product-count").innerHTML);
        targetCameraElement.querySelector(".product-count").innerHTML = countNumber + 1;
      }

    });

}
