const { Router } = require("express");
const {
  payment,
  getPaymentInfo,
} = require("../../controllers/client/controllerMercadoPago.js");

const router = Router();

router.post("/mercadopago", payment);
router.get("/", getPaymentInfo)

module.exports = router;
