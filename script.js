
// 1. CAPTURA DE COMPONENTES DEL REGISTRO (ALTAS)
// Conectados exactamente con nuevos IDs del HTML

const formRegistro = document.getElementById('form-registro');
const nombreReg = document.getElementById('registro-nombre');
const correoReg = document.getElementById('registro-correo');
const passwordReg = document.getElementById('registro-password');
const confirmarReg = document.getElementById('registro-confirmar-password');


// 2. CAPTURA DE COMPONENTES DEL LOGIN (INICIO DE SESIÓN)
// Todo formulario debe tener un ID único para poder capturarlo y procesarlo con JavaScript

const formLogin = document.getElementById('form-login');
const correoLogin = document.getElementById('login-correo');
const passwordLogin = document.getElementById('login-password');



// 3. PROCESAMIENTO DEL FORMULARIO DE ALTAS

if (formRegistro) { // Candado de seguridad para verificar que el formulario exista
    formRegistro.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Detiene la recarga de la página

        // Validación: Compara si las dos casillas de contraseña son iguales
        if (passwordReg.value !== confirmarReg.value) {
            alert("Error:Contraseña no es igual.");
            return; // Frena el proceso si están mal
        }

        // Captura los datos en tiempo real de lo que digitó el usuario
        const usuarioCreadoPorUsuario = {
            nombre: nombreReg.value,
            correo: correoReg.value,
            password: passwordReg.value
        };

        // Guarda la información en la memoria local del navegador (localStorage)

        localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioCreadoPorUsuario));

        // Muestra el mensaje de éxito usando el nombre digitado
        alert(` ${nombreReg.value}! Cuenta creada con exito.`);
        
        formRegistro.reset(); // Limpia los campos del formulario de registro
    });
}



// 4.  Validacion del formulario de login (inicio de sesión)

if (formLogin) { // Candado de seguridad para el formulario de inicio de sesión
    formLogin.addEventListener('submit', function(evento) {
        evento.preventDefault();

        // Intenta jalar al usuario que se registró de la memoria del navegador
        const datosMemoria = localStorage.getItem('usuarioRegistrado');

        // Si nadie se ha registrado, bloquea el inicio de sesión
        if (!datosMemoria) {
            alert("Error: Falta registro!");
            return;
        }

        // Traduce la información de la memoria para que JavaScript la entienda
        const cuentaValida = JSON.parse(datosMemoria);

        // Compara las credenciales escritas en el login con las que guardó el usuario al registrarse
        if (correoLogin.value === cuentaValida.correo && passwordLogin.value === cuentaValida.password) {
            alert(`Igreso exitoso, ${cuentaValida.nombre}.`);
        } else {
            alert("Error: El correo o la contraseña no coinciden con los datos que registraste.");
        }
    });
}
// 5. CERRAR DESPLEGABLES AL HACER CLIC FUERA DE ELLOS
document.addEventListener('click', function(evento) {
    // Captura todos los elementos <details> que estén abiertos en la página
    const desplegablesAbiertos = document.querySelectorAll('details[open]');
    
    desplegablesAbiertos.forEach(function(menu) {
        // Si el clic NO fue dentro del menú desplegable, lo cerramos
        if (!menu.contains(evento.target)) {
            menu.removeAttribute('open');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const enlaceEscritorio = document.getElementById('enlace-pc-escritorio');

    if (enlaceEscritorio) {
        
        // 1. creamos el contenedor  FLOTANTE DIRECTAMENTE AL BODY

        const modalContenedor = document.createElement('div');
        modalContenedor.className = 'modal-fondo-escritorio';
        modalContenedor.id = 'modal-pc-escritorio';

        modalContenedor.innerHTML = `
            <div class="marco-blanco-computadoras">
                <!-- Arriba color naranja  -->
                <div class="barra-superior-naranja"></div>
                
                <div class="cuerpo-marco-computadoras">
                    <h3 class="titulo-marco">Computadoras de Escritorio</h3>
                    
                    <div class="cuadracula-marco-pcs">
                        <!-- PC 1 -->
                        <div class="tarjeta-pc-escritorio">
                            <div>
                                <span class="marca-etiqueta">Marca: HP</span>
                                <img src="pc-escritorio-hp.jpg" alt="PC HP Pavilion">
                                <h4>HP Pavilion Desktop</h4>
                                <p style="font-size: 12px; color:#666;">Intel Core i5 · 8GB RAM · 512GB SSD</p>
                            </div>
                            <div>
                                <p class="precio-normal">$13,899.00 MXN</p>
                                <button class="btn-agregar-marco">Agregar al Carrito 🛒</button>
                            </div>
                        </div>

                        <!-- PC 2 -->
                        <div class="tarjeta-pc-escritorio">
                            <div>
                                <span class="marca-etiqueta">Marca: Lenovo</span>
                                <img src="pc-escritorio-lenovo.jpg" alt="PC Lenovo IdeaCentre">
                                <h4>Lenovo IdeaCentre 3</h4>
                                <p style="font-size: 12px; color:#666;">AMD Ryzen 5 · 16GB RAM · 512GB SSD</p>
                            </div>
                            <div>
                                <p class="precio-normal">$11,450.00 MXN</p>
                                <button class="btn-agregar-marco">Agregar al Carrito 🛒</button>
                            </div>
                        </div>

                        <!-- PC 3 -->
                        <div class="tarjeta-pc-escritorio">
                            <div>
                                <span class="marca-etiqueta">Marca: Dell</span>
                                <img src="pc-escritorio-dell.jpg" alt="PC Dell Inspiron">
                                <h4>Dell Inspiron 3020</h4>
                                <p style="font-size: 12px; color:#666;">Intel Core i7 · 16GB RAM · 1TB SSD</p>
                            </div>
                            <div>
                                <p class="precio-normal">$19,200.00 MXN</p>
                                <button class="btn-agregar-marco">Agregar al Carrito 🛒</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Abajo un Azul -->
                <div class="barra-inferior-azul"></div>
            </div>
        `;

        document.body.appendChild(modalContenedor);

        // 2. DETECTOR ACCIÓN PARA ABRIR EL MARCO

        enlaceEscritorio.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte arriba
            modalContenedor.style.display = 'flex'; // Muestra el frame flotante

            // Cierra el menú desplegable "Productos" superior para que la vista quede limpia
            const menuPadre = enlaceEscritorio.closest('details');
            if (menuPadre) {
                menuPadre.removeAttribute('open');
            }
        });

        // 3. DETECTOR DE ACCIÓN PARA CERRAR AL HACER CLIC FUERA DE LA ZONA BLANCA
        modalContenedor.addEventListener('click', (e) => {
            // Si el clic es directamente en el fondo gris exterior, se oculta el marco
            if (e.target === modalContenedor) {
                modalContenedor.style.display = 'none';
            }
        });
    }
    // ==========================================================================
    // LÓGICA PARA EL MARCO FLOTANTE DE MANTENIMIENTO (SOLICITA TU MANTENIMIENTO)
    // ==========================================================================
    const enlaceMantenimiento = document.getElementById('enlace-mantenimiento');

    if (enlaceMantenimiento) {
        
        // 1. Creamos e inyectamos el contenedor flotante al body
        const modalMantenimiento = document.createElement('div');
        modalMantenimiento.className = 'modal-fondo-escritorio'; // Reutiliza tus estilos de fondo oscuro
        modalMantenimiento.id = 'modal-mantenimiento';

        modalMantenimiento.innerHTML = `
            <div class="marco-blanco-computadoras" style="max-width: 500px;">
                <!-- Arriba color naranja -->
                <div class="barra-superior-naranja"></div>
                
                <div class="cuerpo-marco-computadoras" style="padding: 40px 20px; text-align: center;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-direction: column;">
                        
                        <!-- Logo de WhatsApp oficial con fondo transparente -->
                        <img src="https://wikimedia.org" alt="WhatsApp" style="width: 60px; height: 60px; display: block;">
                        
                        <!-- Leyenda solicitada en color azul -->
                        <h2 style="color: #0056b3; font-family: sans-serif; font-size: 26px; margin: 0; font-weight: bold; letter-spacing: 0.5px;">
                            Solicita tu mantenimiento
                        </h2>
                        
                    </div>
                </div>

                <!-- Abajo un Azul -->
                <div class="barra-inferior-azul"></div>
            </div>
        `;

        document.body.appendChild(modalMantenimiento);

        // 2. Detector de acción para abrir el marco al hacer clic
        enlaceMantenimiento.addEventListener('click', (e) => {
            e.preventDefault(); // Evita saltos bruscos de la página
            modalMantenimiento.style.display = 'flex'; // Muestra la ventana flotante

            // Cierra el menú desplegable "Servicios" superior automáticamente
            const menuPadre = enlaceMantenimiento.closest('details');
            if (menuPadre) {
                menuPadre.removeAttribute('open');
            }
        });

        // 3. Detector de acción para cerrar al hacer clic fuera de la zona blanca
        modalMantenimiento.addEventListener('click', (e) => {
            if (e.target === modalMantenimiento) {
                modalMantenimiento.style.display = 'none';
            }
        });
    }
}); // <-- Este es el cierre definitivo de tu DOMContentLoaded al final de todo el archivo

