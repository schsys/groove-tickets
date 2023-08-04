const nodemailer = require("nodemailer");
const MailGen = require('mailgen')


async function mailer( to, subject, body ) {

// configuracion con datos de accesso a la cuenta de envio (traidos de la variable de entorno)
  const mailConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

// TRANSPORTADOR DEL EMAIL RECIBE LOS DATOS DE CONFIGURACION
const transporter = nodemailer.createTransport(mailConfig);

// CREA LA INSTANCIA QUE PERMITE FORMATEAR EL CONTENIDO DEL MENSJAE
let mailGen = new MailGen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: 'https://mailgen.js'
  }
})

// PLANTILLA DEL MENSAJE
let response = {
  body: {
    name: "Jazz!",  // Nombre del sitio
    intro: "Ha adquirido entradas para un concierto en Jazz!", // mensaje que cabecera del mensaje
    table: {
      data: [
        {
          item: "una entrada para evento",  // id de evento
          description: body,                // Nombre de evento
          price: "1500"                     // hace falta aclarar este campo?
        }
      ]
    },
    outro: "Acceda con sus datos al sitio para ver el detalle del evento"  //mensaje de salida
  }
}

// GENERACION DE LA ESTRUCTURA DEL EMAIL
let email = mailGen.generate(response)

// FUNCION QUE ENVIA EL MENSAJE, RECIBE LA PLANTILLA CON TODOS LOS DATOS PARA EL USUARIO
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: email,
    });
    console.log(`(^-^) Email sent to ${to}`);
  } catch (error) {
    console.error("(º_º) Error sending email:");
    console.error(error.message);
  }
}

module.exports = mailer;
