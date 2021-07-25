//// variable pour localstorage ///
let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit"));
//// variable = selected id
const posElement = document.querySelector("#container-body-panier");
/// si localstorage est vide = affiche panier vide ////
if (
  produitEnregistreLocalStorage === null ||
  produitEnregistreLocalStorage == 0
) {
  const panierVide = `
    <div class="mt-1" >
        <div > Le panier est vide</div>
    </div>
    `;
  posElement.innerHTML = panierVide;
} else {
  ///// on affiche les produits dans le localstorage en html/////
  ///// on met les produits dans un tableau//////
  let structureProdPanier = [];
  for (k = 0; k < produitEnregistreLocalStorage.length; k++) {
    structureProdPanier =
      structureProdPanier +
      `
        <tr id="container-add-panier">
                                <td><img class="img-panier" src="${produitEnregistreLocalStorage[k].img_Produit}"> </td>
                                <td>${produitEnregistreLocalStorage[k].nomProduit}</td>
                                <td>${produitEnregistreLocalStorage[k].option_produit}</td>
                                <td><input class="form-control" type="text" value="1"></td>
                                <td class="text-right">${produitEnregistreLocalStorage[k].prix}€</td>
                                <td class="text-right"><button class="btn btn-sm btn-danger btn-supp"><i class="fa fa-trash" aria-hidden="true"></i>
                                </button> </td>
         </tr>
        `;
  }
  ///// on affiche les produits dans le tableau avec innerHTML//////
  if (k == produitEnregistreLocalStorage.length) {
    posElement.innerHTML = structureProdPanier;
  }
}
/// select button supprimer produit////
let btn_supp = document.querySelectorAll(".btn-supp");
//// on boucle temps autant de fois qu'il y a de boutton supp /////
for (let l = 0; l < btn_supp.length; l++) {
  /// addeventlistener click sur btn_supp ////
  btn_supp[l].addEventListener("click", (event) => {
    event.preventDefault();
    /// select id pour suppr le produit du panier////
    let id_select_supp =
      produitEnregistreLocalStorage[l].id_ProduitSelectionner;
    /// suppression element id avec filter ////
    produitEnregistreLocalStorage = produitEnregistreLocalStorage.filter(
      (el) => el.id_ProduitSelectionner !== id_select_supp
    );
    //// on update le localstorage de la suppression ///
    localStorage.setItem(
      "produit",
      JSON.stringify(produitEnregistreLocalStorage)
    );

    alert("Ce produit a été supprimé du panier");
    window.location.href = "panier.html";
  });
  //// calcule du prix total du panier /////
  let prixTotalCalc = [];
  //// boucle pour mettre les prix dans un tableau pour les additionner plus tard ////
  for (let m = 0; m < produitEnregistreLocalStorage.length; m++) {
    let prixProduitsPanier = produitEnregistreLocalStorage[m].prix;

    prixTotalCalc.push(prixProduitsPanier);
  }
  //// addition des prix via reducer////
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotal = prixTotalCalc.reduce(reducer, 0);
  //// affiche le prix calculé ////
  document.getElementById("total-price").textContent = `${prixTotal}.00€ TTC`;
}
///// fonction affichage formulaire////
const afficherFormHtml = () => {
  const posElement2 = document.querySelector("#container-panier");
  const structForm = `
  <form class="border rounded bg-pink p-1 mb-1 mt-1">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="FirstName">FirstName</label>
              <input
                type="text"
                class="form-control"
                id="inputFirstName"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="LastName">LastName</label>
              <input
                type="text"
                class="form-control"
                id="inputLastName"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              required
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity" required />
            </div>
            <div class="form-group col-md-6">
              <label for="inputZip">Email</label>
              <input
                type="email"
                class="form-control"
                id="inputEmail"
                required
              />
            </div>
          </div>

          <div class="col mb-2">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <button class="btn btn-block btn-light">
                  Continue Shopping
                </button>
              </div>
              <div class="col-sm-12 col-md-6 text-right">
                <button
                  type="submit"
                  class="btn btn-lg btn-block btn-success text-uppercase"
                  id="btn-envoyer-form"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </form>
  `;
  /// ajoute structForm sur dans posElement2 avec insertAdjacentHTML en afterend////
  posElement2.insertAdjacentHTML("afterend", structForm);
};

afficherFormHtml();
localStorage.setItem("prenom", document.querySelector("#inputFirstName").value);

const btnEnvoyerForm = document.querySelector("#btn-envoyer-form");
console.log(btnEnvoyerForm);

//////////ecoute le clic du btn envoie formulaire///////////

btnEnvoyerForm.addEventListener("click", (e) => {
  e.preventDefault();

  const contact = {
    firstName: document.querySelector("#inputFirstName").value,
    lastName: document.querySelector("#inputLastName").value,
    address: document.querySelector("#inputAddress").value,
    city: document.querySelector("#inputCity").value,
    email: document.querySelector("#inputEmail").value,
  };
  console.log(contact);
  /////////////controle du formulaire avant envoie/////////////
  const regExNomPrenomVille = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
  };
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  const regExAddress = (value) => {
    return /^[A-Za-z0-9\s]{5,45}$/.test(value);
  };
  function prenomControl() {
    const lePrenom = contact.firstName;
    if (regExNomPrenomVille(lePrenom)) {
      return true;
    } else {
      alert("Veuillez bien remplir le formulaire Prenom");
      return false;
    }
  }
  function nomControl() {
    const leNom = contact.lastName;
    if (regExNomPrenomVille(leNom)) {
      return true;
    } else {
      alert("Veuillez bien remplir le formulaire Nom");
      return false;
    }
  }
  function villeControl() {
    const laVille = contact.city;
    console.log(laVille);
    if (regExNomPrenomVille(laVille)) {
      return true;
    } else {
      alert("Veuillez bien remplir le formulaire Ville");
      return false;
    }
  }
  function emailControl() {
    const leMail = contact.email;
    console.log(leMail);
    if (regExEmail(leMail)) {
      return true;
    } else {
      alert("Veuillez bien remplir le formulaire Email");
      return false;
    }
  }
  function adresseControl() {
    const laAdresse = contact.address;
    console.log(laAdresse);
    if (regExAddress(laAdresse)) {
      return true;
    } else {
      alert(
        "Veuillez bien remplir le formulaire Adresse, caractere special non autorisé"
      );
      return false;
    }
  }
  if (
    prenomControl() &&
    nomControl() &&
    villeControl() &&
    emailControl() &&
    adresseControl()
  ) {
    localStorage.setItem("FormulaireValue", JSON.stringify(contact));
    localStorage.removeItem("produit");
    window.location.href = "validation.html";
  } else {
  }
  ///////////////////Fin control form//////////////
  //// creation objet contenant le form contact et le panier//////
  let products = [];
  for (const storedTeddy of produitEnregistreLocalStorage) {
    let productsId = storedTeddy.id_ProduitSelectionner;
    products.push(productsId);
    console.log(storedTeddy.id_ProduitSelectionner);
  }
  console.log(products);
  let aEnvoyer = {
    products,
    contact,
  };
  console.log(aEnvoyer);

  ///Envoie de l'objet aEnvoyer vers le server////////
  const post = async function (data) {
    try {
      let response = await fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data.orderId);
        localStorage.setItem("responseOrder", data.orderId);
        window.location = "validation.html";
        localStorage.removeItem("newArticle");
      } else {
        e.preventDefault();
        console.error("Retour du serveur : ", response.status);
        alert("Erreur rencontrée : " + response.status);
      }
    } catch (error) {
      alert("Erreur : " + error);
    }
  };
  post(aEnvoyer);
});
