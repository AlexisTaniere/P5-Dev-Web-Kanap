// On récupère l'identifiant de la commande dans l'url
let urlcourante = document.location.href; 
let url = new URL(urlcourante);
let orderId = url.searchParams.get("id");

// On ajoute l'identifiant au DOM
let order = document.getElementById('orderId');
order.innerHTML = orderId;

// La commande étant passée on nettoie le localStorage
localStorage.clear();