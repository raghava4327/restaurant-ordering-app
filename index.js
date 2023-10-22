import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Dom elements
const foodItems = document.getElementById('food-items')
const orderSection=document.getElementById("order-section")
const paymentEl=document.getElementById("payment")
const totalPrice=document.getElementById("total-price")
const placeOrder=document.getElementById("place-order")
const thanksMessage=document.getElementById("thanks-message")

// rendering the food items
menuArray.forEach(element => {
    const { name, ingredients, id, price, image} = element
    foodItems.innerHTML+= `<div class="item">
    <div class="item-content">
        <img src="images/${image}" alt="${name} image">
        <div class="item-details">
            <p class ='item-title'>${name}</p>
            <p class ='item-ingredients'>${ingredients.join(', ')}</p>
            <p class = 'item-price'>$${price}</p>
        </div>
    </div>
    <button class="btn" data-id = "${id}">+</button>
</div>`
});

//All button clicks
document.addEventListener("click",(e)=>{
e.target.dataset.id && addItem(e.target.dataset.id)
e.target.dataset.remove && remove(e.target.dataset.remove)
e.target.id === 'place-order-btn' && payment()
e.target.id === 'payment-close-btn' && closePayment()
})
document.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(e.target.id)
    e.target.id === 'payment-form' && paid()
})

// Adding the item to cart
const addItem = (id) =>{
    thanksMessage.style.display="none"
    const item= menuArray.filter(function(foodItem){
        return id == foodItem.id
    })[0]
    const getuuid=uuidv4()
    placeOrder.innerHTML
    +=`<div class="add-item" id=${getuuid} data-price=${item.price}>
            <div class="add-item-details">
            <p class="added-item-name">${item.name}</p>
            <button class = "remove-btn" data-remove=${getuuid}>remove</button>
            </div>
            <p class="added-item-price" >$${item.price}</p>
        </div>`
    totalPrice.innerHTML=`<p>Total Price: </p><p>$${totalprice()}</p>`

}  

// Removing the card items
const remove = (id)=>{
    totalPrice.innerHTML=`<p>Total Price: </p>
        <p>$${totalprice()-document.getElementById(id).dataset.price}</p>`
    document.getElementById(id).remove()
    const arr = document.getElementsByClassName("add-item")
    const display= arr.length ? 'block':'none'
    orderSection.style.display=display
}

// Calculating the total price of items
const totalprice=()=>{
    const arr = document.getElementsByClassName("add-item")
    const display= arr.length ? 'block':'none'
    orderSection.style.display=display
    let total=0
    for(let element of arr){
        total += Number(element.dataset.price)
    }
    return total
}

// Placing the order
const payment=()=>{
    document.querySelectorAll('input').forEach(element => element.value='')
    paymentEl.style.display="block"  

}

// closing the modal
const closePayment=()=>{
    paymentEl.style.display="none"
    foodItems.disabled=true
}

// Payment button 
const paid=()=>{
    paymentEl.style.display="none"
    orderSection.style.display="none"
    thanksMessage.style.display="block"
    placeOrder.innerHTML=''
}
