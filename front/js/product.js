let urlcourante = document.location.href; 
let url = new URL(urlcourante);
let productId = url.searchParams.get("id");

let urlApi = "http://localhost:3000/api/products";
let urlproduct = urlApi + '/' + productId;


// Ajoute l'ensemble des informations du produit dans le DOM
function productsList(value){

  let title = document.getElementById('title');
  let price = document.getElementById('price');
  let description = document.getElementById('description');
  let colors = document.getElementById('colors');
  let item = document.getElementsByClassName("item__img")[0];
  
  
  title.innerHTML += value.name;
  price.innerHTML += value.price + ' ';
  description.innerHTML += value.description;
  item.innerHTML += `<img src="${value.imageUrl}" alt="${value.altTxt}"></img>`;

  for(color of value.colors){
  colors.innerHTML += `<option value="${color}">${color}</option>`;
  }
}

function isCorrectNumber(number){
  return /^([1-9][0-9]?|100)$/.test(number);
}

fetch(urlproduct)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
  
    productsList(value);


    const cartClick = document.getElementById('addToCart'); 
    cartClick.addEventListener('click', function() {  

      let colorChosen = document.getElementById("colors").value;
      let quantityChosen = parseInt(document.getElementById("quantity").value);
     
      if(colorChosen === ""){
        alert('Veuillez choisir une couleur');
      }
      if(quantityChosen === 0){
        alert('La quantité choisie doit être comprise entre 1 et 100');
      }

      if(colorChosen !== "" && quantityChosen !== 0){


        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart){
          cart=[];
        } 

        const found = cart.find(product => {
         if(product.id === productId && product.color === colorChosen){
           return product;
         }
        });
        
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

      let objProduct = JSON.stringify(cart);
      localStorage.setItem("cart",objProduct);

      // alert(objProduct);

      // console.log(colorChosen);
      // console.log(quantityChosen);
      }
    });
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  