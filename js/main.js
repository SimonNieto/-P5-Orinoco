//////appel de la fonction main ///
main();
///////////////////////////////////

//// FONCTION MAIN ASYNCHRONE/////
async function main() {
  //// declaration et attente des reponses des fonctions//
  const teddies = await getTeddies();
  const cams = await getCams();
  const meubles = await getMeubles();
  ///afficher la totalité des articles ///
  for (teddie of teddies) {
    displayArticles(teddie, "teddies");
  }
  for (cam of cams) {
    displayArticles(cam, "cameras");
  }
  for (meuble of meubles) {
    displayArticles(meuble, "furniture");
  }
}

/////// ALLER CHERCHER LES INFOS ARTICLES FETCH/////
async function getTeddies() {
  return fetch(`http://localhost:3000/api/teddies/`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (teddies) {
      return teddies;
    })
    .catch(function (error) {
      alert(error);
    });
}
async function getCams() {
  return fetch(`http://localhost:3000/api/cameras/`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (cams) {
      return cams;
    })
    .catch(function (error) {
      alert(error);
    });
}
async function getMeubles() {
  return fetch(`http://localhost:3000/api/furniture/`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (Meubles) {
      return Meubles;
    })
    .catch(function (error) {
      alert(error);
    });
}
/////// FIN RECHERCHE INFOS ARTICLES FETCH/////

///// FONCTION POUR AFFICHER LES ARTICLES PAR TYPE /////
function displayArticles(article, type) {
  const templateElt = document.getElementById("templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);
  //****afficher les infos recuperé dans la base de donnée //
  cloneElt.getElementById("card-title").textContent = article.name;
  cloneElt.getElementById("card-img").src = article.imageUrl;
  cloneElt.getElementById(
    "card-link"
  ).href = `produits.html?type=${type}&id=${article._id}`;
  cloneElt.getElementById("card-price").textContent = `${
    article.price / 100
  }.00 €`;

  document.getElementById("main").appendChild(cloneElt);
  //****afficher les infos recuperé dans la base de donnée //
  ///// FIN FONCTION POUR AFFICHER LES ARTICLES PAR TYPE /////
}
