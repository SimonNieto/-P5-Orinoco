(async () => {
  //// On va chercher l'id et le type du produit///
  const productType = getProductType();
  const productId = getProductId();
  //// afficher les données du produit selectionner avec l'id et son type ///
  const productData = await getProductData(productType, productId);

  displayProduct(productData);
  /// selection option //
  const idForm = document.querySelector("#product-select");
  //// selection bouton ajout au panier //
  const btn_envoyerPanier = document.querySelector("#btn-envoyer");
  /// addEventListener sur click ///
  btn_envoyerPanier.addEventListener("click", (event) => {
    event.preventDefault();

    const choixForm = idForm.value;
    //// creation objet contenant les options du produits selectionné ////
    let optionsProduit = {
      nomProduit: productData.name,
      id_ProduitSelectionner: productData._id,
      option_produit: choixForm,
      quantite: 1,
      img_Produit: productData.imageUrl,
      prix: productData.price / 100,
    };
    //// variable pour localstorage ////
    let produitEnregistreLocalStorage = JSON.parse(
      localStorage.getItem("produit")
    );
    //// fonction confirmation d'ajout au panier///
    const popupConfirmation = () => {
      if (
        window.confirm(`${productData.name} option: ${choixForm} a bien été ajouté au panier
         Aller au panier OK ou revenir a l'acceuil ANNULER`)
      ) {
        window.location.href = "panier.html";
      } else {
        window.location.href = "index.html";
      }
    };
    /// fonction ajout du produit dans local storage ///
    const ajoutProduitLocalStorage = () => {
      produitEnregistreLocalStorage.push(optionsProduit);
      localStorage.setItem(
        "produit",
        JSON.stringify(produitEnregistreLocalStorage)
      );
    };
    //// if true array pas vide ****** else false array vide///
    if (produitEnregistreLocalStorage) {
      ajoutProduitLocalStorage();
      popupConfirmation();
    } else {
      produitEnregistreLocalStorage = [];
      ajoutProduitLocalStorage();
      popupConfirmation();
    }
  });
})();
//// fonction pour get id et get type ////
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}
function getProductType() {
  return new URL(window.location.href).searchParams.get("type");
}
//// fonction get data du produits à afficher////
function getProductData(productType, productId) {
  return fetch(`http://localhost:3000/api/${productType}/${productId}`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (productData) {
      return productData;
    })
    .catch(function (error) {
      alert(error);
    });
}
//// afficher les informations recupere du produits/////
function displayProduct(product) {
  document.getElementById("product-img").src = product.imageUrl;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `${
    product.price / 100
  }.00 €`;
  document.getElementById("product-description").textContent =
    product.description;
  ///// selection option ////
  const select = document.getElementById("product-select");
  ///// Est ce une camera, meuble, peluche ? /////
  if (product.colors) {
    ///// boucle affichage des options disponibles/////
    for (const color of product.colors) {
      let newOption = new Option(color, color);
      select.add(newOption, undefined);
    }
  }
  if (product.lenses) {
    ///// boucle affichage des options disponibles/////
    for (const lense of product.lenses) {
      let newOption = new Option(lense, lense);
      select.add(newOption, undefined);
    }
  }
  if (product.varnish) {
    ///// boucle affichage des options disponibles/////
    for (const varnish of product.varnish) {
      let newOption = new Option(varnish, varnish);
      select.add(newOption, undefined);
    }
  }
}
