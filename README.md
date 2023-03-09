# Yazz - PG HENRY
Proyecto Grupal para la finalización del Bootcamp de Henry

<h2>Yazz</h2>
Este proyecto fue realizado en grupo como parte del trabajo final del Bootcamp de Henry. Se trata de un eccomerce que será usado por una ONG de Mar del Plata dedicada a la enseñanza de música, realización de festivales y venta de entradas a shows de música. Nuestra aplicación permite vender entradas a shows y eventos.

<h3>Tecnologías utilizadas</h3>
JavaScript</br>
React</br>
MUI</br>
Redux</br>
Sequelize</br>
PostgreSQL</br>
React Admin</br>

<h3>Funcionalidades</h3>
<b>Búsqueda de shows:</b> los usuarios pueden buscar shows por nombre y la searchbar mostrará sugerencias mientras el usuario escribe.
</br>
<b>Filtros:</b> los usuarios pueden filtrar los shows por fecha y categoría de música.
</br>
<b>Reviews:</b> los usuarios pueden hacer reviews de los shows a los que asistieron.
</br>
<b>Compra de entradas:</b> los usuarios pueden comprar entradas a través de la pasarela de pago de Mercado Pago.
</br>
<b>Register y Login:</b> los usuarios pueden iniciar sesión a través de su correo electrónico y contraseña o mediante su cuenta de Google.

<h3>Instalación</h3>
Clona este repositorio.</br>
Ejecuta npm install para instalar las dependencias necesarias.</br>
Crea una base de datos PostgreSQL local y configura las credenciales en el archivo server/config/config.json.</br>
Ejecuta npm run dev para correr la aplicación en modo desarrollo.</br>
Abre http://localhost:3000 en tu navegador.</br>

<h3>Acceso a la aplicación</h3>
La aplicación está disponible en línea en https://pg-front-henry.vercel.app/.

<h3>¿Cómo testear la funcionalidad de carrito y pasarlea de pago?</h3>
Para poder completar una compra, como la app está todavía en modo desarrollo, se debe utilizar los datos de la tarjeta provista por Mercado Pago. </br>
Estos son los datos que debes introducir:</br>
Número de tarjeta: 5031 7557 3453 0604 </br>
Fecha de vto.: 11/25</br>
Nombre: Cualquier nombre</br>
Clave: 123</br>
