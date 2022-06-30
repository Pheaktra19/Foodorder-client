const Order = require('../../models/order')
const moment = require('moment')

function orderController() {
    return {
        async store(req, res) {
            try {
                //console.log('checkout')
                const { phone, address } = req.body

                if (!phone || !address) {
                    req.flash('error', 'All fields are required')
                    return res.redirect('/cart')
                }


                let order = await Order.create({
                    customerId: req.user._id,
                    items: JSON.stringify(req.session.cart.items),
                    phone,
                    address
                })

                await order.save().then(result => {
                    req.flash('success', "Order placed successfully")
                    delete req.session.cart
                    return res.redirect('/myorder')
                }).catch(err => {
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/cart')
                })

            } catch (err) {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            }


        },
        async myorder(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null, { sort: { 'createdAt': -1 } })

            let all_orders = orders;

            for (let i = 0; i < all_orders.length; i++) {
                all_orders[i].items = JSON.parse(all_orders[i].items)
            }

            res.render('myorder', { orders: all_orders, moment: moment })

        }
    }
}
module.exports = orderController