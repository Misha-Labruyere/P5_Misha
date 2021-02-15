let order = JSON.parse(localStorage.getItem("validation"));

if(order) {
    var commandId = document.getElementById("command-id").innerHTML = "Commande n°" + order.orderId;
}
else {
    var errorCommand = document.getElementById("command-validation").innerHTML = " Erreur de formulaire";
}