const Menu = require("../../models/menu")
const axios = require("axios")

function homeController() {
    return {
        home(req, res) {
            // console.log('home');

            let categories = []
                //get all category
            axios.get("http://localhost:3001/category/all")
                .then((cat) => {
                    // console.log("get category", cat.data.data)
                    categories = cat.data.data

                    Menu.find({}, function(err, docs) {
                        if (err) {
                            console.log(err);
                        } else {

                            res.render("home", { data: docs, categories: categories })
                        }
                    });
                })


        },
    }
}

module.exports = homeController