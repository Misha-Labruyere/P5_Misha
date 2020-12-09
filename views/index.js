fetch("http://localhost:3000/api/cameras/")
  .then((product) => product.json())
  .then((product) => {
    for (let i = 0; i < product.length; i++) {
      //cloner le produit vide
      let produitVide = document.getElementById("catalogueCamera");

      let newCamera = produitVide.cloneNode(true);

      //compléter les informations de la camera
      newCamera.getElementsByClassName("name")[0].innerHTML = product[i].name;
      newCamera.getElementsByClassName("price")[0].innerHTML =
        Intl.NumberFormat().format(product[i].price) + "€";
      newCamera.getElementsByClassName("description")[0].innerHTML =
        product[i].description;
      newCamera.getElementsByClassName("photo")[0].src = product[i].imageUrl;

      //rediriger le lien de personnalisation vers la page du produit
      

      //injecter dans le html le nouveau produit
      document.getElementById("catalogueCamera").appendChild(newCamera);
    }
  });
