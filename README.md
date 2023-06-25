# Groove Tickets
<p>
Si bien los inicios fueron humildes ya que se inicio como Proyecto Grupal para la finalización del Bootcamp de <i>soyHenry.com</i>, se ha tomado la iniciativa de hacerlo publico refactorizando gran parte del trabajo realizado a nuevas tecnologias y metodologias para asegurar tanto la confiablidad del codigo, asi como la seguridad de los datos en un ambiente real de produccion.<br/>
Se decidio iniciar esta etapa debido a graves inconvenientes que se presentaron al momento de intentar escalar el proyecto inicial.<br/>
La continua incompatibilidad con las mejoras que se deseaban implementar sumado a la escases de suites de prueba, llevaron al colapso total del servicio backend, siendo mas provechoso y efectivo iniciar el desarrollo de esta nueva etapa.
</p>

<p>
<h2>Que es <i>Groove Tickets</i></h2>
Se trata de un e-comerce que, en principio, será usado por una ONG de Mar del Plata dedicada a la enseñanza de música, realización de festivales y venta de entradas a los espectaculos realizados por las diferentes bandas que componen la ONG, las cuales abarcan un gran abanico de estilos musicales. Nuestra aplicación permite vender entradas a estos eventos.
</p>
<p>
<h2>Tecnologías utilizadas</h2>
Al encontrarnos en modo de desarrollo, las dependencias de esta plataforma aun no han sido completamente definidas, pero listamos aqui las dependencias minimas que permiten el trabajo en esta fase.
<span>
<h3><b>Frontend</b></h3>
<li>Typescript</li>
<li>React</li>
<li>Redux</li>
<li>React Router</li>
<li>Tailwind</li>
</span>
<br/>
<span>
<h3><b>Backend</b></h3>
<li>Typescript</li>
<li>ExpressJS</li>
<li>ImageKit</li>
<li>Sequelize</li>
<li>PostgreSQL</li>
<li>MercadoPago</li>
</span>
</p>

<h2>Funcionalidades</h2>
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
<ol>
<li>
Clona este repositorio.</br>
</li>
<li>
Ejecuta <i>npm install</i> para instalar las dependencias necesarias.
</li>
<li>
Crea una base de datos PostgreSQL local y configura las credenciales en el archivo server/config/config.json.
</li>
<li>
Ejecuta npm run dev para correr la aplicación en modo desarrollo.
</li>
<li>
Abre http://localhost:3000 en tu navegador.
</li>
</ol>

<!-- <h2>Acceso a la aplicación</h2>
La aplicación está disponible en línea en https://pg-front-henry.vercel.app/. -->

<h2>¿Cómo testear la funcionalidad de carrito y pasarela de pago?</h2>
Para poder completar una compra se deben utilizar los datos de la <b>tarjeta de pruebas</b> provista por Mercado Pago. </br>
Estos son los datos que debes introducir:</br>
<b>Número de tarjeta:</b> 5031 7557 3453 0604 </br>
<b>Fecha de vto.:</b> 11/25</br>
<b>Nombre:</b> Cualquier nombre</br>
<b>Clave:</b> 123</br>
