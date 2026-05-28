<script setup>
import { reactive } from 'vue';
import { useSessionStore } from '@/modules/auth/stores/sessionStore';
import { useRouter } from 'vue-router';

const tiendaSesion = useSessionStore();
const enrutador = useRouter();

const formulario = reactive({
  correo: '',
  password: ''
});

async function procesarLogin() {
  if (!formulario.correo || !formulario.password) {
    tiendaSesion.error = "Completa todos los campos obligatorios";
    return;
  }
  
  const exito = await tiendaSesion.iniciarSesion(formulario);
  if (exito) {
    enrutador.push('/'); // Te regresa a la pantalla principal si la contraseña es correcta
  }
}
</script>

<template>
  <section class="contenedor">
    <form class="formulario-login" @submit.prevent="procesarLogin" v-if="!tiendaSesion.autenticado">
      <h2>🔐 Acceso al Sistema</h2>
      <p>Ingresa tus credenciales de empleado</p>

      <label for="correo">Correo Electrónico</label>
      <input type="email" id="correo" v-model="formulario.correo" placeholder="ejemplo@techfix.com">

      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="formulario.password" placeholder="Tu contraseña">

      <p v-if="tiendaSesion.error" class="aviso">{{ tiendaSesion.error }}</p>

      <button type="submit" :disabled="tiendaSesion.cargando">
        {{ tiendaSesion.cargando ? 'Verificando en la base de datos...' : 'Iniciar Sesión' }}
      </button>
    </form>

    <div v-else class="panel-exito">
      <p class="correcto">¡Sesión iniciada como {{ tiendaSesion.nombreBienvenida }}!</p>
      <button @click="tiendaSesion.cerrarSesion()" class="btn-rojo">Cerrar Sesión</button>
    </div>
  </section>
</template>

<style scoped>
.contenedor { 
  max-width: 400px;
  margin: 50px auto; 
  padding: 20px; 
  text-align: center; 
}
.formulario-login { 
  background: white; 
  border-radius: 18px; 
  padding: 30px; 
  box-shadow: 0 4px 12px rgba(0,0,0,.2); 
  display: flex; 
  flex-direction: column; 
  text-align: left; 
}
.formulario-login h2 { 
  text-align: center; 
  color: rgb(71, 16, 102); 
  margin-top: 0; 
}
.formulario-login p { 
  text-align: center; 
  color: #666; 
  margin-bottom: 20px; 
}
label { 
  font-weight: bold; 
  color: rgb(22, 108, 5); 
  margin-bottom: 5px; 
}
input { 
  padding: 12px; 
  margin-bottom: 15px; 
  border-radius: 10px; 
  border: 2px solid rgb(8, 101, 195); 
  font-size: 14px; 
}
input:focus { 
  outline: none; 
  border-color: #3d6df4; 
  box-shadow: 0 0 0 3px rgba(61, 110, 240, .20); 
}
button { 
  background: linear-gradient(90deg, #26ec79, #165614); 
  color: white; 
  padding: 12px; 
  border: none; 
  border-radius: 10px; 
  font-weight: bold; 
  cursor: pointer; 
  transition: 0.2s; 
  margin-top: 10px; 
}
button:hover { 
  opacity: 0.85; 
  transform: translateY(-2px); 
}
button:disabled { 
  opacity: 0.5; 
  cursor: not-allowed; 
}
.aviso { 
  color: #b22222; 
  font-weight: bold; 
  text-align: center; 
}
.correcto { 
  color: #5c0467; 
  font-weight: bold; 
  text-align: center; 
  font-size: 18px; 
}
.panel-exito { 
  margin-top: 20px; 
  background: white; 
  padding: 30px; 
  border-radius: 15px; 
  box-shadow: 0 4px 12px rgba(0,0,0,.2); 
}
.btn-rojo { 
  background: #dc2626; 
  width: 100%; 
}
</style>