const Order = require("../models/Order");

const get_all = async (req, res) => {
  try {
    const get_data = await Order.find();
    res.status(200).json({ success: true, data: get_data });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const changeStatus = async (req, res) => {
    const { id,  status } = req.body;  
    try{
        let doc = await Order.findById(id);
        doc.status = status;
        await doc.save();
        res.status(200).json({ success: true, data: doc });
    } catch(error) {
        res.status(400).json({ success: false, error: error });

    }
};

module.exports = {
  get_all,
  changeStatus
};
