// Récupération de l'ensemble des produits sur l'API
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {


    // On pointe sur l'élément ayant pour identifiant "items"
    let element = document.getElementById('items');
    
    // On ajoute de manière dynamique les éléments de l'API au DOM
    // (identifiant, url de l'image, valeur alternative pour l'image, nom et description du produit)
    // pour chaque produit trouvé.
    for(values of value){
        element.innerHTML +=  `
        <a href="./product.html?id=${values._id}">
        <article>
          <img src="${values.imageUrl}" alt="${values.altTxt}">
          <h3 class="productName">${values.name}</h3>
          <p class="productDescription">${values.description}</p>
        </article>
      </a>`;
    }
    
  })
  .catch(function(err) {
    alert("Une erreur est survenue");
  });

  