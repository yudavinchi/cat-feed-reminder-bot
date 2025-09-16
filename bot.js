require("dotenv").config();

const token = process.env.ACCESS_TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;
const recipient = process.env.RECIPIENT_NUMBER;

const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

(async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: recipient,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "התזכורת היומית להאכיל את השרמוטות הקטנים..."
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: { id: "meal_morning", title: "בוקר 🥓" }
            },
            {
              type: "reply",
              reply: { id: "meal_noon", title: "צהריים 🍗" }
            },
            {
              type: "reply",
              reply: { id: "meal_evening", title: "לילה 🌙" }
            }
          ]
        }
      }
    }),
  });

  const data = await response.json();
  console.log("Response:", JSON.stringify(data, null, 2));
})();