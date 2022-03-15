fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {

    let element = document.getElementById('items');
    // console.log(element);

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

  