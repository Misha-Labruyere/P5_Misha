creationCart();

function creationCart() {
  let camerasInCart = JSON.parse(localStorage.getItem("camerasInCart"));

  for (let i = 0; i < camerasInCart.length; i++) {
    let idCameraInCart = camerasInCart[i].idProduct;

    fetch("http://localhost:3000/api/cameras/" + idCameraInCart)
      .then((product) => product.json())
      .then((product) => {
        let emptyProduct = document.getElementById("empty-camera");

        var newCamera = emptyProduct.cloneNode(true);

        if (
          !document.getElementById(
            "camera-" +
              camerasInCart[i].idProduct +
              camerasInCart[i].choiceLense
          )
        ) {
          newCamera.setAttribute(
            "id",
            "camera-" +
              camerasInCart[i].idProduct +
              camerasInCart[i].choiceLense
          );
          newCamera.getElementsByClassName("name")[0].innerHTML = product.name;
          newCamera.getElementsByClassName("price")[0].innerHTML =
            Intl.NumberFormat("de").format(product.price) + "€";
          newCamera.getElementsByClassName("description")[0].innerHTML =
            product.description;
          newCamera.getElementsByClassName("photo")[0].src = product.imageUrl;
          newCamera.getElementsByClassName("selected-lens")[0].innerHTML =
            camerasInCart[i].choiceLense;
          newCamera.querySelector(".product-count").innerHTML = 1;

          newCamera
            .querySelector(".article-suppression")
            .addEventListener("click", function () {
              articleSuppression(
                camerasInCart[i].idProduct,
                camerasInCart[i].choiceLense
              );
            });

          document.getElementById("cameras-in-cart").appendChild(newCamera);
        } else {
          let targetCameraElement = document.getElementById(
            "camera-" +
              camerasInCart[i].idProduct +
              camerasInCart[i].choiceLense
          );
          let countNumber = parseInt(
            targetCameraElement.querySelector(".product-count").innerHTML
          );
          targetCameraElement.querySelector(".product-count").innerHTML =
            countNumber + 1;
        }
      });
  }
}

let sentForm = document.getElementById("sent-form");
sentForm.addEventListener("click", data);

function data(e) {
  e.preventDefault();
  var idCameras = [];
  for (i = 0; i < camerasInCart.length; i++) {
    idCameras.push(camerasInCart[i].idProduct);
  }

  var data = {
    contact: {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      city: document.getElementById("city").value,
      address: document.getElementById("address").value,
      email: document.getElementById("mail").value,
    },

    products: idCameras,
  };

  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      console.log(JSON.parse(request.response));
      document.location.href = "validation.html";
      localStorage.setItem("validation", request.response);
    }
  };
  request.open("POST", "http://localhost:3000/api/cameras/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
}

function articleSuppression(cameraId, choiceLense) {
  console.log(cameraId);
  console.log(choiceLense);

  //On veut d'abord récupérer le tableau des produits sélectionnés depuis le localstorage (parsed)
  let oldCart = JSON.parse(localStorage.getItem("camerasInCart"));
  console.log(oldCart);

  //On veut supprimer l'entrée d'un tableau
  for (i = 0; i < oldCart.length; i++) {
    if (cameraId[i] + choiceLense[i]) {
      oldCart.splice(i, 1);
    }
  }
  //Supprimer le panier dans le html
  localStorage.removeItem("camerasInCart");

  //Sauvegarder dans le localstorage le nouveau tableau généré
  let newCart = localStorage.setItem("camerasInCart", JSON.stringify(oldCart));

  window.location.reload();

  creationCart(newCart);
}
