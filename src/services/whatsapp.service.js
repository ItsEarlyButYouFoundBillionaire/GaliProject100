 // This file is the generic WhatsApp API handler — all sending, templating, and message dispatch logic.

 import axios from "axios";

 const WHATSAPP_API_URL = `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
 const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

 /**
  * Send a pre-approved WhatsApp Template Message
  * @param {string} to - Customer phone number in international format (with country code)
  * @param {string} templateName - The name of the approved WhatsApp template
  * @param {string} languageCode - Language code of the template (e.g., en_US)
  * @param {Array} parameters - Array of objects for template placeholders
  */

 export const sendTemplateMessage = async (to,templateName,languageCode,parameter =[])=>{
  try{
   const payload ={//payload =tells whatsapp = what messgae,to whome, how
    messaging_product:"whatsapp",
    to,
    type:"template",
    template:{
     name:templateName,
     language:{
      code:languageCode
     },
     components: parameters.length > 0 ? [//if we have any placeholders then it will include them  and if not it will send them empty array
      {
       type:"body",
       parameters
      }
     ]:[]
    }
   }
   const response = await axios.post(WHATSAPP_API_URL, payload, {
    headers: {
     Authorization: `Bearer ${ACCESS_TOKEN}`,
     "Content-Type": "application/json"
    }
   });

   console.log(" Template message sent:", response.data);
   return response.data;

  }catch (error){
   console.error("Error sending the template ",error.response?.data||error.message);
   throw error;
  }
 }