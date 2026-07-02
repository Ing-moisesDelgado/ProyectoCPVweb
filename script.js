// ==========================================================
// PANTALLA 1: CAPTURA DE COMPONENTES DEL REGISTRO (ALTAS)
// ==========================================================
const formRegistro = document.getElementById('form-registro');
const nombreReg = document.getElementById('registro-nombre');
const correoReg = document.getElementById('registro-correo');
const passwordReg = document.getElementById('registro-password');
const confirmarReg = document.getElementById('registro-confirmar-password');


// ==========================================================
// PANTALLA 2: CAPTURA DE COMPONENTES DEL LOGIN (SESIÓN)
// ==========================================================
const formLogin = document.getElementById('form-login');
const correoLogin = document.getElementById('login-correo');
const passwordLogin = document.getElementById('login-password');

// ==========================================================
// PANTALLA 3: PROCESAMIENTO DEL FORMULARIO DE ALTAS
// ==========================================================
if (formRegistro) {
    formRegistro.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Detiene la recarga automática de la página
        
        // Validación obligatoria: Compara que las contraseñas coincidan
        if (passwordReg.value !== confirmarReg.value) {
            alert("Error: Contraseña no es igual.");
            return; // Detiene la ejecución si hay un error
        }

        // Crea el objeto con la información ingresada por el usuario
        const usuarioCreadoPorUsuario = {
            nombre: nombreReg.value,
            correo: correoReg.value,
            password: passwordReg.value
        };

        // Guarda el objeto en la memoria interna del navegador (localStorage)
        localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioCreadoPorUsuario));

        alert(`¡${nombreReg.value}! Cuenta creada con éxito.`);
        formRegistro.reset(); // Limpia los campos de texto del registro
    });
}

// ==========================================================
// PANTALLA 4: VALIDACIÓN DEL FORMULARIO DE LOGIN
// ==========================================================
if (formLogin) {
    formLogin.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Evita que la página salte al enviar
        
        // Intenta obtener al usuario guardado en el localStorage
        const datosMemoria = localStorage.getItem('usuarioRegistrado');

        // Bloqueo de seguridad: Si no hay nadie registrado en el navegador
        if (!datosMemoria) {
            alert("Error: ¡Falta registro!");
            return;
        }

        // Convierte el texto plano de la memoria a un objeto JavaScript ejecutable
        const cuentaValida = JSON.parse(datosMemoria);

        // Validación cruzada de credenciales escritas vs credenciales guardadas
        if (correoLogin.value === cuentaValida.correo && passwordLogin.value === cuentaValida.password) {
            alert(`Ingreso exitoso, ${cuentaValida.nombre}.`);
        } else {
            alert("Error: El correo o la contraseña no coinciden con los datos que registraste.");
        }
    });
}

// ==========================================================
// PANTALLA 5: CERRAR DESPLEGABLES AL HACER CLIC FUERA
// ==========================================================
document.addEventListener('click', function(evento) {
    // Captura únicamente los menús <details> que se encuentren abiertos en la interfaz
    const desplegablesAbiertos = document.querySelectorAll('details[open]');
    
    desplegablesAbiertos.forEach(function(menu) {
        // Si el clic se hace fuera del componente, se remueve el atributo 'open'
        if (!menu.contains(evento.target)) {
            menu.removeAttribute('open');
        }
    });
});

// ==========================================================
// PANTALLA 6: CARGA DINÁMICA DEL MODAL DE PRODUCTOS
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    const enlaceEscritorio = document.getElementById('enlace-pc-escritorio');

    if (enlaceEscritorio) {
        // Crea el nodo contenedor para el fondo del modal flotante
        const modalContenedor = document.createElement('div');
        modalContenedor.className = 'modal-fondo-escritorio';
        modalContenedor.id = 'modal-pc-escritorio';

        // Estructura HTML inyectada directamente al DOM para las PC de Escritorio
        modalContenedor.innerHTML = `
            <div class="marco-blanco-computadoras">
                <div class="barra-superior-naranja"></div>
                <div class="cuerpo-marco-computadoras">
                    <h3 class="titulo-marco">Computadoras de Escritorio</h3>
                    <div class="cuadracula-marco-pcs">
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
                <div class="barra-inferior-azul"></div>
            </div>
        `;

        document.body.appendChild(modalContenedor);

        // Evento para abrir la ventana flotante de productos
        enlaceEscritorio.addEventListener('click', (e) => {
            e.preventDefault();
            modalContenedor.style.display = 'flex'; // Muestra el marco centrado
            
            // Cierra el menú desplegable padre "Productos" para limpiar la vista
            const menuPadre = enlaceEscritorio.closest('details');
            if (menuPadre) {
                menuPadre.removeAttribute('open');
            }
        });

        // Evento para ocultar el modal al hacer clic en las zonas grises del fondo
        modalContenedor.addEventListener('click', (e) => {
            if (e.target === modalContenedor) {
                modalContenedor.style.display = 'none';
            }
        });
    }
});

// ==========================================================
// PANTALLA 7: CARGA DINÁMICA DEL MODAL DE MANTENIMIENTO
// ==========================================================
    const enlaceMantenimiento = document.getElementById('enlace-mantenimiento');

    if (enlaceMantenimiento) {
        // Crea el nodo contenedor para el formulario de servicio
        const modalMantenimiento = document.createElement('div');
        modalMantenimiento.className = 'modal-fondo-escritorio';
        modalMantenimiento.id = 'modal-mantenimiento';

        // Estructura HTML inyectada directamente al DOM para la solicitud técnica
        modalMantenimiento.innerHTML = `
            <div class="marco-blanco-computadoras" style="max-width: 450px;">
                <div class="barra-superior-naranja"></div>
                <div class="cuerpo-marco-computadoras">
                    <h3 class="titulo-marco">Agendar Mantenimiento</h3>
                    <p style="font-size: 14px; margin-bottom: 15px; color: #555;">Deja tus datos y un especialista técnico te contactará a la brevedad.</p>
                    
                    <form id="form-solicitar-mantenimiento" style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-weight: bold; font-size: 13px;">Modelo del Equipo / Componentes:</label>
                            <input type="text" id="mant-equipo" placeholder="Ej. PC Gamer, Laptop Asus" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div style="display: flex; flex-direction: column;">
                            <label style="font-weight: bold; font-size: 13px;">Falla o Servicio Requerido:</label>
                            <textarea id="mant-falla" placeholder="Ej. Limpieza interna, cambio de pasta térmica, no enciende..." required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical; height: 80px;"></textarea>
                        </div>
                        <button type="submit" class="btn-agregar-marco" style="width: 100%; margin-top: 10px;">Enviar Solicitud 🛠️</button>
                    </form>
                </div>
                <div class="barra-inferior-azul"></div>
            </div>
        `;

        document.body.appendChild(modalMantenimiento);

        // Evento para abrir el modal de agenda técnica
        enlaceMantenimiento.addEventListener('click', (e) => {
            e.preventDefault();
            modalMantenimiento.style.display = 'flex';
            
            // Cierra el menú desplegable padre "Servicios"
            const menuPadre = enlaceMantenimiento.closest('details');
            if (menuPadre) {
                menuPadre.removeAttribute('open');
            }
        });

        // Evento para ocultar el modal de servicio al hacer clic afuera
        modalMantenimiento.addEventListener('click', (e) => {
            if (e.target === modalMantenimiento) {
                modalMantenimiento.style.display = 'none';
            }
        });

        // Procesamiento e intercepción del formulario de mantenimiento
        const formMantenimiento = document.getElementById('form-solicitar-mantenimiento');
        formMantenimiento.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("¡Solicitud enviada! El Ingeniero Moisés Delgado se comunicará contigo pronto.");
            formMantenimiento.reset(); // Resetea las cajas de texto del mantenimiento
            modalMantenimiento.style.display = 'none'; // Cierra la ventana flotante automáticamente
        });
    }


