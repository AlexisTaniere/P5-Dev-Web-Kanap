let cart = JSON.parse(localStorage.getItem("cart"));

let urlApi = "http://localhost:3000/api/products/";


// Calcule la quantité totale de produits présents dans le panier
function totalQuantity(){
  let elementQuantity = document.getElementById('totalQuantity');
  let totalQuantity = 0;
  for(product of cart){
    totalQuantity += product.quantity;
  }
  elementQuantity.innerHTML = totalQuantity;
}

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
      if(i === cart.length - 1){
        let elementPrice = document.getElementById('totalPrice');
        elementPrice.innerHTML = totalPrice;
      }
    });
  }
}

function deleteProduct(){
  let select = document.getElementsByClassName('deleteItem');
    for(let i = 0; i < select.length; i++){
      select[i].addEventListener('click', function (e) {
        console.log("Suppr article " + i);

        const article = select[i].closest("article");
        const id = article.dataset.id;
        const color = article.dataset.color;

        const index = cart.findIndex(item => item.id === id && item.color === color);
        console.log(id, color);
        console.log(index);

        cart.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(cart));

        window.location.reload();

        alert('Cet article a bien été supprimé');
      });
      totalPrice();
      totalQuantity();
      
    }
}

function modifyProduct(){
    let select = document.getElementsByClassName('itemQuantity');
    
    for(let i = 0; i < select.length; i++){
      select[i].addEventListener('change', function (e) {
        // console.log(select[i].valueAsNumber);

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
          console.log(id, color);
          console.log(index);

        cart[index].quantity = quantity;
        localStorage.setItem("cart",JSON.stringify(cart));
        window.location.reload();
        }
      });
      totalPrice();
      totalQuantity();
    }

}

function testFirstName(){
    let firstName = document.getElementById('firstName');
    firstName.addEventListener('input', function (e){
      console.log(firstName.value);
      console.log(isCorrectChar(firstName.value));
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

function validFirstName(){
  let firstName = document.getElementById('firstName').value;
  let error = document.getElementById('firstNameErrorMsg').innerHTML;

    console.log(firstName);
    console.log(error);
  if(firstName !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}

function testLastName(){
  let lastName = document.getElementById('lastName');
  lastName.addEventListener('input', function (e){
    console.log(lastName.value);
    console.log(isCorrectChar(lastName.value));
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

function validLastName(){
  let lastName = document.getElementById('lastName').value;
  let error = document.getElementById('lastNameErrorMsg').innerHTML;

    console.log(lastName);
    console.log(error);
  if(lastName !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}



function testCity(){
  let city = document.getElementById('city');
  city.addEventListener('input', function (e){
    console.log(city.value);
    console.log(isCorrectChar(city.value));
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

function validCity(){
  let city = document.getElementById('city').value;
  let error = document.getElementById('cityErrorMsg').innerHTML;

    console.log(city);
    console.log(error);
  if(city !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}

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

function validAddress(){
  let address = document.getElementById('address').value;
  let error = document.getElementById('addressErrorMsg').innerHTML;

    console.log(address);
    console.log(error);
  if(address !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}

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
    console.log(isCorrectMail(mail.value));
  });
}

testMail();

function validMail(){
  let mail = document.getElementById('email').value;
  let error = document.getElementById('emailErrorMsg').innerHTML;

    console.log(mail);
    console.log(error);
  if(mail !== "" && error === ""){
    return true;
  }
  else {
    return false;
  }
}

function order(){
  let order = document.getElementById('order');

  order.addEventListener('click', function(e){
    e.preventDefault();
    if(cart.length === 0){
      alert("Votre panier est vide");
    }
    else{

      if(validFirstName() && validLastName() && validCity() && validAddress() && validMail()){
      console.log("Nom, prénom, adresse, ville et mail valides");

        let contact = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          email: document.getElementById("email").value,
        }

        let productId = []; 
          for (product of cart) {
             productId.push(product.id)
          }

        let order = { 
          contact,
          products: productId,
        };

        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
          },
         };

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

    // window.location.reload();
  });
  
}

  order();
