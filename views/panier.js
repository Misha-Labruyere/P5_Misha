//Ajout de chaque produit du localstorage dans le panier
displayCart();

function displayCart() {
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

//Vérification et envoi du formulaire
let sentForm = document.getElementById("sent-form");
sentForm.addEventListener("click", data);


function data(e) {
  let camerasInCart = JSON.parse(localStorage.getItem("camerasInCart"));

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
    if (request.readyState == 4 && request.status !== 400) {
      document.location.href = "validation.html";
	  localStorage.setItem("validation", request.response);
	}

  };

  request.open("POST", "http://localhost:3000/api/cameras/order");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
  
}


//Suppression d'un article au click sur le bouton de suppression
function articleSuppression(cameraId, choicedLense) {
  let oldCart = JSON.parse(localStorage.getItem("camerasInCart"));

  for (i = 0; i < oldCart.length; i++) {
    indexTemp = i;
    if (
      oldCart[i].idProduct == cameraId &&
      oldCart[i].choiceLense == choicedLense
    ) {
      oldCart.splice(i, 1);
      break;
    }
  }

  document.getElementById("cameras-in-cart").innerHTML = "";

  localStorage.setItem("camerasInCart", JSON.stringify(oldCart));

  displayCart();
}
