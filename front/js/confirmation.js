let urlcourante = document.location.href; 
let url = new URL(urlcourante);
let orderId = url.searchParams.get("id");

console.log(orderId);

let order = document.getElementById('orderId');
order.innerHTML = orderId;

localStorage.clear();