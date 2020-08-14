const ready =()=>{
  const removeItemButtons = document.getElementsByClassName('btn-danger')
  for(let i = 0; i<removeItemButtons.length;i++){
    let button = removeItemButtons[i];
    button.addEventListener('click', removeCartItem)
  }
  const quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener('change',quantityChanged);
    
  }
  const addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener('click',addToCartClicked);
      
  }
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

const purchaseClicked = () =>{
  const cartItems = document.getElementsByClassName('cart-items')[0];
  if(cartItems.hasChildNodes())
  {
    while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild)
    }
    alert('Gracias, vuelva prontos c:');
  }else{
    alert('Tu carrito está vacío');
  }
  
  updateCartTotal();
}
const quantityChanged = (event) =>{
  let input = event.target;
  if(isNaN(input.value) || input.value<=0){
    input.value=1;
  }
  updateCartTotal();
}

const addToCartClicked = (event) =>{
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  const image = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title,price,image);
  updateCartTotal()
}

const addItemToCart = (title, price, image) =>{
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItemsNames = document.getElementsByClassName('cart-item-title');
  for (let i = 0; i < cartItemsNames.length; i++) {
    if(cartItemsNames[i].innerText === title){
      alert("El artículo ya está en el carrito")
      return
    }
    
  }
  let cartItems = document.getElementsByClassName('cart-items')[0];
  const  cartRowContent = `
      <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
  `
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}
const removeCartItem = (event) =>{
  console.log('Hizo click');
  let buttonClickced = event.target;
  buttonClickced.parentElement.parentElement.remove();
  updateCartTotal();
}

const updateCartTotal = () =>{
  const cartItemContainer = document.getElementsByClassName('cart-items')[0];
  const cartRows = cartItemContainer.getElementsByClassName('cart-row')
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const elementPrice = cartRow.getElementsByClassName('cart-price')[0];
    const elementQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0];

    const price = parseFloat(elementPrice.innerText.replace('$',''))
    const quantity = elementQuantity.value
    total = total + (price * quantity)
    
  }
  total = Math.round(total * 100)/100
  document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`;
}

if(document.readyState=='loading'){
  document.addEventListener('DOMContentLoader',ready);
}
else{
  ready()
}