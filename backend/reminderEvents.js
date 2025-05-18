const admin = require('firebase-admin');
const nodemailer = require("nodemailer");
require('dotenv').config();

admin.initializeApp({
  credential : admin.credential.cert({
    type: process.env.TYPE,
    project_id : process.env.PROJECT_ID,
    private_key_id : process.env.PRIVATE_KEY_ID,
    private_key : process.env.PRIVATE_KEY,
    client_email : process.env.CLIENT_EMAIL,
    client_id : process.env.CLIENT_ID,
    auth_uri : process.env.AUTH_URI,
    token_uri : process.env.TOKEN_URI,
    auth_provider_x509_cert_url : process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url : process.env.CLIENT_X509_CERT_URL,
    universe_domain :process.env.UNIVERSE_DOMAIN
  }),
});

 const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAILEMAIL,
    pass: process.env.GMAILPASS,
  },
});


const sendEventReminder = async () => {
     
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const ddmmyyyy = tomorrow.toISOString().split("T")[0];

      const eventsDocs = await db.collection("event").get();
      const tomorrowEvents = [];

      eventsDocs.forEach((e) => {
        if (e.data().date === ddmmyyyy) {
          tomorrowEvents.push(e.id);
        }
      });

      const registrations = await db.collection("registration").get();

      for (const r of registrations.docs) {
        if (tomorrowEvents.includes(r.data().eventId)) {
          const user = await db.collection("user").doc(r.data().userId).get();
          const event = await db.collection("event").doc(r.data().eventId).get();

          const object = {
            email: user.data().email,
            eventTitle: event.data().title,
            eventDescription: event.data().description,
            eventDate: event.data().date,
          };

          const options = {
            from: process.env.GMAILEMAIL,
            to: object.email,
            subject: `Reminder : ${object.eventTitle} is tomorrow !`,
            text: `Don't forget! "${object.eventTitle}" is scheduled for ${object.eventDate.toUTCString()}.\n\n${object.eventDescription}`,
          };

          try {
            await transporter.sendMail(options);
            console.log("emails sent to :"+ options.to);
          } catch (e) {
            console.log("error sending message to : "+ options.to);
          }
        }
      }
};




module.exports = sendEventReminder;
