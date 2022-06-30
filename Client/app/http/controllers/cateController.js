const category = require("../../models/category")

function cateController() {
    return {
        subcate(req, res) {
            // console.log('home');

            category.find({}, function(err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("subcate", { category: "category" })
                }
            });
        },
    }
}

module.exports = cateController