/////////////////recup id de la commande///
let orderId = localStorage.getItem("responseOrder");
const orderValidationText = document.querySelector("#validation-text");
orderValidationText.textContent = "Numéro de commande : " + orderId + " validé";
