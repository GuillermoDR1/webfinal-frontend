import { defineStore } from 'pinia';
import { ref } from 'vue';

const URL_BACKEND = "https://api-techfix-backend.onrender.com";

export const useSessionStore = defineStore('sesion', () => {
  const nombreBienvenida = ref('Invitado');
  const tipoPlan = ref('Básico');
  const autenticado = ref(false);
  const error = ref('');
  const cargando = ref(false);

  async function iniciarSesion(credenciales) {
    cargando.value = true;
    error.value = '';
    try {
      const respuesta = await fetch(`${URL_BACKEND}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });
      const datos = await respuesta.json();
      
      if (!respuesta.ok) throw new Error(datos.mensaje || 'Credenciales incorrectas');
      
      // Si el login es exitoso, Flask nos manda los datos del usuario real
      nombreBienvenida.value = datos.sesion.nombreUsuario;
      tipoPlan.value = 'Administrador'; 
      autenticado.value = true;
      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    } finally {
      cargando.value = false;
    }
  }

  async function cerrarSesion() {
    try {
      // Le avisamos a Flask que destruya la sesión
      await fetch(`${URL_BACKEND}/logout`, { method: 'POST' });
    } catch (err) {
      console.log("Error al cerrar sesión", err);
    }
    nombreBienvenida.value = 'Invitado';
    tipoPlan.value = 'Básico';
    autenticado.value = false;
  }

  return { nombreBienvenida, tipoPlan, autenticado, error, cargando, iniciarSesion, cerrarSesion };
});