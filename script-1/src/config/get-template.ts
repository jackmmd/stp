interface Props {
    name:string
    email:string
    subject:string
}
export const getTemplate=({name,email,subject}:Props)=>`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body style="font-family: sans-serif;">
  <h3 style="text-align: center;">Hola ${name}</h3>
  <p style="text-align: center;"><i>En STRACON Group, como en cada edición de PERUMIN, estamos preparando un encuentro para nuestros principales
      clientes y partners estratégicos, del cual nos encantaría que seas parte. <br>Te esperamos para compartir
      juntos de una tarde especial. <br> <br> <strong>Agradeceremos nos confirmes tu participación.</strong> <br><b>STRACON Group</b></i></p>
  <div style="text-align:center;">
  <a href="mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Confirmo mi asistencia")}">
    <img height="600px" style="display:block;margin:0 auto;" src="https://raw.githubusercontent.com/jackmmd/stp-public-images/refs/heads/main/meet-greet.png" />
  </a>
  </div>
</body>
</html>
`