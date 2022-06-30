const Product = require("../models/Product");

//get all products
const get_all = async(req, res) => {
    const { page, item_per_page, name } = req.query;

    try {
        //default option paginate
        let options = {
            page: 1,
            limit: 10,
            populate: ["category"],
        };

        //modify option paginate
        if (page) options.page = page;
        if (item_per_page) options.limit = item_per_page;

        //filter
        let filter = {};
        if (name) {
            const regex = new RegExp(name, "i");
            filter.name = { $regex: regex };
        }

        const all = await Product.paginate(filter, options);

        console.log('get all', all)

        res.json({ success: true, data: all });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

//get all products with populate
const get_all_populate = async(req, res) => {
    try {
        const all = await Product.find().populate(["category"]);
        res.json({ success: true, data: all });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

//get product by id
const get_by_id = async(req, res) => {
    const { id } = req.params;
    try {
        const doc = await Product.findById(id);
        res.status(200).json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

//get products by filter
const get_by_filter = async(req, res) => {
    const { cat_id } = req.query;

    try {
        let filter = {};
        if (cat_id) filter.category = cat_id;

        console.log(filter);
        const doc = await Product.find(filter).populate("category");
        res.json({ success: true, data: doc });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

//create new product
const create_new = async(req, res) => {
    try {
        const doc = await Product.create(req.body);
        await doc.save();

        res.json({ success: true, data: doc });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

//delete a product by id
const delete_by_id = async(req, res) => {
    const { id } = req.params;
    try {
        const deleting = await Product.deleteOne({ _id: id });
        res.json({ success: true, data: deleting });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

//update a prodcut by id
const update_by_id = async(req, res) => {
    const { id } = req.params;
    const { name, description, price, cat_id, sub_id, imageUrl } = req.body;

    try {
        const doc = await Product.findById(id);

        if (name) doc.name = name;
        if (description) doc.description = description;
        if (price) doc.price = price;
        if (cat_id) doc.category = cat_id;
        if (sub_id) doc.subcategory = sub_id;
        if (imageUrl) doc.imageUrl = imageUrl;

        await doc.save();

        res.json({ success: true, data: doc });
    } catch (error) {
        res.json({ success: false, error: error });
    }
};

module.exports = {
    get_all,
    get_all_populate,
    create_new,
    get_by_id,
    get_by_filter,
    delete_by_id,
    update_by_id,
};