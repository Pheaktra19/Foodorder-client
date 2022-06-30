import axios from 'axios'
import Noty from 'noty'
let addToCart = document.querySelectorAll('.addcart')
let cartCounter = document.querySelector('#cartCounter ')


function updateCart(data) {
    axios.post('/update-cart', data).then(res => {

        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item is added to cart!",
            progressBar: false

        }).show();

    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something went wrong",
            progressBar: false,

        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        let data = JSON.parse(btn.dataset.data)
        updateCart(data)
    })
})