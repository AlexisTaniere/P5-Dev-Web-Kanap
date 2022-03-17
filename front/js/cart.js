let cart = JSON.parse(localStorage.getItem("cart"));

let urlApi = "http://localhost:3000/api/products/";

//----------------------------------------------------------------
// Calcule la quantité totale de produits présents dans le panier
//----------------------------------------------------------------
function totalQuantity(){
  let elementQuantity = document.getElementById('totalQuantity');
  let totalQuantity = 0;
  for(product of cart){
    totalQuantity += product.quantity;
  }
  elementQuantity.innerHTML = totalQuantity;
}

// Regexes pour vérifier les données saisies dans le formulaire de confirmation de commande
function isCorrectNumber(number){
  return /^([1-9][0-9]?|100)$/.test(number);
}

function isCorrectChar(char){
  return /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/.test(char);
}

function isCorrectMail(char){
  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}$');
  return regex.test(char);
}

  function isCorrectAddress(char){
    return /^[a-zA-Z0-9\'\-çñàéèêëïîôüù ]{2,}$/.test(char);
  }


//-------------------------------------------------------------------
// Affiche de manière dynamique les éléments présents dans le panier
//-------------------------------------------------------------------
function displayCart(){
  let element = document.getElementById('cart__items');
  if (!cart){
    cart=[];
  } 
  for(let i = 0; i < cart.length; i++){
    let urlproduct = urlApi + cart[i].id;
    let color = cart[i].color;
    let product_id = cart[i].id;
    let quantity = cart[i].quantity;
    fetch(urlproduct)
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(value) {


    element.innerHTML += `
    <article class="cart__item" data-id="${product_id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${value.imageUrl}" alt="${value.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${value.name}</h2>
                    <p>${color}</p>
                    <p>${value.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;  
              
              // Test pour savoir si la boucle arrive à sa dernière itération
              if(i === cart.length - 1){
              deleteProduct();
              modifyProduct();
              }
       })
       .catch((err) => {
         alert("erreur " + err);
       });
       
    }
}

displayCart();


//------------------------------------------------------------
// Calcule le prix total des produits présents dans le panier
//------------------------------------------------------------
function totalPrice(){
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++){
    let urlproduct = urlApi + cart[i].id;
    let quantity = cart[i].quantity;
    fetch(urlproduct)
    .then(function(res){
      if (res.ok){
        return res.json();
      }
    })
    .then(function(value){
      totalPrice += value.price * quantity;

      //Modifie le DOM lors de la dernière itération de la boucle
      if(i === cart.length - 1){
        let elementPrice = document.getElementById('totalPrice');
        elementPrice.innerHTML = totalPrice;
      }
    });
  }
}


//-------------------------------------------------------------------------
// Supprime l'élément du panier correspondant au bouton "supprimer" cliqué
//-------------------------------------------------------------------------
function deleteProduct(){
  let select = document.getElementsByClassName('deleteItem');

    // Écoute le clic sur l'ensemble des boutons "supprimer"
    for(let i = 0; i < select.length; i++){
      select[i].addEventListener('click', function (e) {

        // Récupère l'article le plus proche du bouton cliqué, son identifiant et sa couleur
        const article = select[i].closest("article");
        const id = article.dataset.id;
        const color = article.dataset.color;

        // Récupère l'index du produit correspondant à l'identifiant et à la couleur définis
        const index = cart.findIndex(item => item.id === id && item.color === color);

        // Supprime du panier le produit correspondant
        cart.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(cart));

        window.location.reload();

        alert('Cet article a bien été supprimé');
      });

      // Calcule de nouveau le prix et la quantité total après suppression
      totalPrice();
      totalQuantity();
      
    }
}


//--------------------------------------------------------------------------
// Modifie la quantité d'un produit après l'écoute d'un changement (change)
//--------------------------------------------------------------------------
function modifyProduct(){
    let select = document.getElementsByClassName('itemQuantity');
    
    for(let i = 0; i < select.length; i++){
      select[i].addEventListener('change', function (e) {

        const quantity = select[i].valueAsNumber
       

        if(!isCorrectNumber(quantity)){
          alert('La quantité choisie doit être comprise entre 1 et 100');
          window.location.reload();
        }
        else{
          const article = select[i].closest("article");
          const id = article.dataset.id;
          const color = article.dataset.color;
  
          const index = cart.findIndex(item => item.id === id && item.color === color);

        cart[index].quantity = quantity;
        localStorage.setItem("cart",JSON.stringify(cart));
        window.location.reload();
        }
      });
      totalPrice();
      totalQuantity();
    }

}
//-------------------------------------------------------------------------------------
// Test le prénom avec le regex isCorrectChar et affiche un message d'erreur si besoin
//-------------------------------------------------------------------------------------
function testFirstName(){
    let firstName = document.getElementById('firstName');
    firstName.addEventListener('input', function (e){
  
      let error = document.getElementById('firstNameErrorMsg');
      if(!isCorrectChar(firstName.value) && firstName.value !== ""){
        error.innerHTML = "Prénom non valide";
        return false;
      }
      else{
        error.innerHTML = "";
        return true;
      }
    });
}

testFirstName();


//-----------------------------------------------------------------------------
// Teste si le prénom est bien renseigné et s'il n'y a pas de message d'erreur
//-----------------------------------------------------------------------------
function validFirstName(){
  let firstName = document.getElementById('firstName').value;
  let error = document.getElementById('firstNameErrorMsg').innerHTML;

  if(firstName !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}


//----------------------------------------------------------------------------------
// Test le nom avec le regex isCorrectChar et affiche un message d'erreur si besoin
//----------------------------------------------------------------------------------
function testLastName(){
  let lastName = document.getElementById('lastName');
  lastName.addEventListener('input', function (e){
 
    let error = document.getElementById('lastNameErrorMsg');
    if(!isCorrectChar(lastName.value) && lastName.value !== ""){
      error.innerHTML = "Nom non valide";
      return false;
    }
    else{
      error.innerHTML = "";
      return true;
    }
  });
}
testLastName();


//--------------------------------------------------------------------------
// Teste si le nom est bien renseigné et s'il n'y a pas de message d'erreur
//--------------------------------------------------------------------------
function validLastName(){
  let lastName = document.getElementById('lastName').value;
  let error = document.getElementById('lastNameErrorMsg').innerHTML;

  if(lastName !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}


//------------------------------------------------------------------------------------
// Test la ville avec le regex isCorrectChar et affiche un message d'erreur si besoin
//------------------------------------------------------------------------------------
function testCity(){
  let city = document.getElementById('city');
  city.addEventListener('input', function (e){

    let error = document.getElementById('cityErrorMsg');
    if(!isCorrectChar(city.value) && city.value !== ""){
      error.innerHTML = "Ville non valide";
      return false;
    }
    else{
      error.innerHTML = "";
      return true;
    }
  });
}

testCity();


//-----------------------------------------------------------------------------
// Teste si la ville est bien renseignée et s'il n'y a pas de message d'erreur
//-----------------------------------------------------------------------------
function validCity(){
  let city = document.getElementById('city').value;
  let error = document.getElementById('cityErrorMsg').innerHTML;

  if(city !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}

//----------------------------------------------------------------------------------------
// Test l'adresse avec le regex isCorrectAddress et affiche un message d'erreur si besoin
//----------------------------------------------------------------------------------------
function testAddress(){
  let address = document.getElementById('address');

  address.addEventListener('input', function(e){
  let error = document.getElementById('addressErrorMsg');
  if(!isCorrectAddress(address.value) && address.value !== ""){
      error.innerHTML = "Adresse non valide";
      return false;
   }
   else{
     error.innerHTML = "";
     return true;
   }
  });
}

testAddress();


//------------------------------------------------------------------------------
// Teste si l'adresse est bien renseignée et s'il n'y a pas de message d'erreur
//------------------------------------------------------------------------------
function validAddress(){
  let address = document.getElementById('address').value;
  let error = document.getElementById('addressErrorMsg').innerHTML;

  if(address !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}


//-----------------------------------------------------------------------------------
// Test le mail avec le regex isCorrectMail et affiche un message d'erreur si besoin
//-----------------------------------------------------------------------------------
function testMail(){
  let mail = document.getElementById('email');
  mail.addEventListener('input', function(e){
    let error = document.getElementById('emailErrorMsg');
    if(!isCorrectMail(mail.value) && mail.value !== ""){
      error.innerHTML = "Adresse e-mail non valide";
      return false;
    }
    else{
      error.innerHTML = "";
      return true;
    }
  });
}

testMail();


//---------------------------------------------------------------------------
// Teste si le mail est bien renseigné et s'il n'y a pas de message d'erreur
//---------------------------------------------------------------------------
function validMail(){
  let mail = document.getElementById('email').value;
  let error = document.getElementById('emailErrorMsg').innerHTML;

  if(mail !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}


//---------------------------------------------------------------------------------------------------
// Teste l'ensemble des éléments du formulaire et envoie un contact et une liste de produits à l'API
//---------------------------------------------------------------------------------------------------
function order(){
  let order = document.getElementById('order');

  order.addEventListener('click', function(e){
    e.preventDefault();
    if(cart.length === 0){
      alert("Votre panier est vide");
    }
    else{

      // Si le prénom, le nom, la ville, l'adresse et la mail sont corrects
      if(validFirstName() && validLastName() && validCity() && validAddress() && validMail()){


        // Création d'un objet contact à partir des éléments saisis dans le formulaire
        let contact = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          email: document.getElementById("email").value,
        }

        // Création d'une liste d'identifiants de produits
        let productId = []; 
          for (product of cart) {
             productId.push(product.id)
          }

        // Création d'un objet order qui sera envoyé à l'API
        let order = { 
          contact,
          products: productId,
        };

        // Définition de la méthode et des informations à envoyer à l'API
        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
          },
         };

        // Envoi des éléments à l'API et récupération de l'identifiant de la commande
        fetch("http://localhost:3000/api/products/order", options)
          .then(response => response.json())
          .then(data => {
          document.location.href = "confirmation.html?id=" + data.orderId;
      })
      .catch((err) => {
          alert("Le serveur a rencontré un problème " + err);
      });

      }
      else{
        alert("Veuillez renseigner correctement tous les champs du formulaire");
      }
    }
  });
  
}

  order();
