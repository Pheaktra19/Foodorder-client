const axios = require("axios")

function subController() {
    return {
        async subcate(req, res) {
            const { cat_id, name } = req.query;
            let url = '';
            if (cat_id) url = `http://localhost:3001/product/filter?cat_id=${cat_id}`;
            if (name) url = `http://localhost:3001/product/all?name=${name}`

            const products = await axios.get(url)

            let data = "";

            if (cat_id) data = products.data.data;
            if (name) data = products.data.data.docs;

            //console.log('products', data)
            res.render("subcate", { data: data })
        },
    }
}
module.exports = subController