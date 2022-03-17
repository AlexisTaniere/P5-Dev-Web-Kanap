// On récupère l'identifiant correspondant au produit séléctionné depuis l'url
let urlcourante = document.location.href; 
let url = new URL(urlcourante);
let productId = url.searchParams.get("id");

// Définition de l'url composée de l'adresse de l'API concaténée à l'identifiant du produit
let urlApi = "http://localhost:3000/api/products";
let urlproduct = urlApi + '/' + productId;

//-----------------------------------------------------------
// Ajoute l'ensemble des informations du produit dans le DOM
//-----------------------------------------------------------
function productsList(value){

  
  // On pointe sur les différents éléments à modifier dans le DOM
  let title = document.getElementById('title');
  let price = document.getElementById('price');
  let description = document.getElementById('description');
  let colors = document.getElementById('colors');
  let item = document.getElementsByClassName("item__img")[0];
  
  
  // On modifie les différents éléments (nom du produit, prix, description, image et couleur(s) du produit)
  title.innerHTML += value.name;
  price.innerHTML += value.price + ' ';
  description.innerHTML += value.description;
  item.innerHTML += `<img src="${value.imageUrl}" alt="${value.altTxt}"></img>`;

  for(color of value.colors){
  colors.innerHTML += `<option value="${color}">${color}</option>`;
  }
}

//------------------------------------------------------------------------------
// Teste si le nombre est compris entre 1 et 100 et renvoie true le cas échéant
//------------------------------------------------------------------------------
function isCorrectNumber(number){
  return /^([1-9][0-9]?|100)$/.test(number);
}

// Récupération des informations contenues dans l'API pour le produit séléctionné
fetch(urlproduct)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
  
    // Modification du DOM avec les valeurs du produit
    productsList(value);


    // On écoute le clic sur le bouton "ajouter au panier"
    const cartClick = document.getElementById('addToCart'); 
    cartClick.addEventListener('click', function() {  

      // On récupère la quantité et la couleur choisie
      let colorChosen = document.getElementById("colors").value;
      let quantityChosen = parseInt(document.getElementById("quantity").value);
     
      if(colorChosen === ""){
        alert('Veuillez choisir une couleur');
      }
      if(quantityChosen === 0){
        alert('La quantité choisie doit être comprise entre 1 et 100');
      }

      if(colorChosen !== "" && quantityChosen !== 0){


        // Récupère le localStorage et le transforme en objet Javascript (parse)
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart){
          cart=[];
        } 

        // Teste si le produit séléctionné est déjà présent dans le localStorage (même identifiant et même couleur)
        // Retourne le produit le cas échéant
        const found = cart.find(product => {
         if(product.id === productId && product.color === colorChosen){
           return product;
         }
        });
        
        // Définition d'un objet produit que l'on ajoutera au localStorage
        let newProduct = {
          id : productId,
          color : colorChosen,
          quantity : quantityChosen}

        if (found){
          if(!isCorrectNumber(quantityChosen)){
            alert('La quantité choisie doit être comprise entre 1 et 100');
          }
          else{
          found.quantity += quantityChosen;
          alert(quantityChosen + ' produit(s) de ce modèle ont été ajouté(s)');
          }
        }
        else{
          if(!isCorrectNumber(quantityChosen)){
            alert('La quantité choisie doit être comprise entre 1 et 100');
          }
          else{
          cart.push(newProduct);
          alert('Votre produit a bien été ajouté au panier');
        }
      }

      // On ajoute l'objet cart au localStorage après l'avoir modifié en chaîne JSON (stringify)
      let objProduct = JSON.stringify(cart);
      localStorage.setItem("cart",objProduct);
      }
    });
  })
  .catch(function(err) {
    alert("Une erreur est survenue");
  });

  