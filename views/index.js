fetch("http://localhost:3000/api/cameras/")
  .then((product) => product.json())
  .then((product) => {
    for (let i = 0; i < product.length; i++) {
      //cloner le produit vide
      let emptyProduct = document.getElementById("empty-camera");

      let newCamera = emptyProduct.cloneNode(true);

      //enlève ou cache la caméra vide

      //compléter les informations de la camera
      newCamera.getElementsByClassName("name")[0].innerHTML = product[i].name;
      newCamera.getElementsByClassName("price")[0].innerHTML =
        Intl.NumberFormat("de").format(product[i].price) + "€";
      newCamera.getElementsByClassName("description")[0].innerHTML =
        product[i].description;
      newCamera.getElementsByClassName("photo")[0].src = product[i].imageUrl;
      newCamera
        .getElementsByClassName("selected-product")[0]
        .setAttribute("href", "./produit.html?id=" + product[i]._id);

      //ajouter le lien de personnalisation vers la page du produit
      newCamera.getElementsByClassName(
        "selected-product"
      )[0].onclick = function lensCustomization() {
        let idSelectedProduct = product[i]._id;
        localStorage.setItem("selectedProduct", idSelectedProduct);
      };

      //injecter dans le html le nouveau produit
      document.getElementById("catalogue-camera").appendChild(newCamera);
    }
  });
