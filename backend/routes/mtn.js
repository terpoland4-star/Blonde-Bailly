const express = require("express");
const router = express.Router();
const axios = require("axios");
const { v4: uuid } = require("uuid");

// ENV VARIABLES
const SUBSCRIPTION_KEY = process.env.MTN_SUB_KEY;
const API_USER = process.env.MTN_API_USER;
const API_KEY = process.env.MTN_API_KEY;

const BASE_URL = "https://sandbox.momodeveloper.mtn.com";

// TOKEN
async function getToken() {
  const res = await axios.post(
    BASE_URL + "/collection/token/",
    {},
    {
      headers: {
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
        Authorization:
          "Basic " + Buffer.from(API_USER + ":" + API_KEY).toString("base64")
      }
    }
  );

  return res.data.access_token;
}

// PAIEMENT
router.post("/pay", async (req, res) => {
  try {
    const { amount, phone } = req.body;

    const token = await getToken();
    const referenceId = uuid();

    await axios.post(
      BASE_URL + "/collection/v1_0/requesttopay",
      {
        amount: amount.toString(),
        currency: "XOF",
        externalId: referenceId,
        payer: {
          partyIdType: "MSISDN",
          partyId: phone
        },
        payerMessage: "Blonde Bailly Payment",
        payeeNote: "Commande"
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "X-Reference-Id": referenceId,
          "X-Target-Environment": "sandbox",
          "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ success: true, referenceId });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "MTN payment error" });
  }
});

// STATUS
router.get("/status/:id", async (req, res) => {
  try {
    const token = await getToken();

    const response = await axios.get(
      `${BASE_URL}/collection/v1_0/requesttopay/${req.params.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "X-Target-Environment": "sandbox",
          "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: "Status error" });
  }
});

module.exports = router;
