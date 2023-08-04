const { Router } = require('express');
const { addEditOrderItems } = require('../../controllers/client/controllerAddEditOrderItems');

const router = Router();

router.put("/:id/items", async (req, res) => {
    const {id} = req.params;
    // array [{productId, quantity}] = req.body;
    const {items} = req.body;
    try {
        const orderId = id;
        const orderItems = await addEditOrderItems({orderId, items});
        if (!orderItems || orderItems.hasOwnProperty('error') ) 
            return res.status(404).json({error: orderItems.error});             
        return res.status(200).json(orderItems);
    }catch(e) {
        res.status(400).json({error: e.message});
    }
})

module.exports = router;