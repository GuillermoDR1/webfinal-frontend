<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useReparacionesStore } from '@/modules/public/stores/reparacionesStore';
import ItemCard from '@/modules/public/components/ItemCard.vue';
import { useSessionStore } from '@/modules/auth/stores/sessionStore';

const reparacionesStore = useReparacionesStore()
const sessionStore = useSessionStore();

const form = reactive({
  cliente_nombre: '', equipo: '', problema: '', estado: 'En revisión', costo: 0
})

const guardando = ref(false)

const formularioValido = computed(() => {
  return (form.cliente_nombre.trim() !== '' && form.equipo.trim() !== '' && form.problema.trim() !== '')
})

async function procesarFormulario() {
  if (!formularioValido.value) return

  guardando.value = true
  const nuevaReparacion = {
    cliente_nombre: form.cliente_nombre,
    equipo: form.equipo,
    problema: form.problema,
    estado: form.estado,
    costo: Number(form.costo)
  }
  
  try {
    await reparacionesStore.agregarReparacion(nuevaReparacion)
    if (!reparacionesStore.error) {
      form.cliente_nombre = ''
      form.equipo = ''
      form.problema = ''
      form.estado = 'En revisión'
      form.costo = 0
    }
  } finally {
    guardando.value = false
  }
}

onMounted(() => {
  reparacionesStore.cargarReparaciones()
})

async function confirmarEliminacion(item) {
  const confirmar = window.confirm(`¿Seguro que deseas eliminar el equipo "${item.equipo}" del taller?`)
  if (!confirmar) return

  try {
    // Llama a la función de la store 
    await reparacionesStore.eliminarReparacion(item.id) 
  } catch (error) {
    console.error("Error al eliminar:", error)
  }
}
</script>

<template>
  <section class="contenedor">
    <h1>🛠️ Panel de Taller y Reparaciones</h1>
    
    <p v-if="reparacionesStore.cargando" class="aviso">Cargando registros del taller...</p>
    <p v-else-if="reparacionesStore.error" class="aviso"> Error: {{ reparacionesStore.error }}</p>

    <div class="resumen">
      <div class="dato">
        <span>Equipos Registrados</span>
        <strong>{{ reparacionesStore.totalReparaciones }}</strong>
      </div>
      <div class="dato">
        <span>Equipos en Revisión</span>
        <strong>{{ reparacionesStore.equiposEnRevision }}</strong>
      </div>
    </div>

    <form class="formulario" v-if="sessionStore.autenticado" @submit.prevent="procesarFormulario">
      <h2>📝 Ingresar Nuevo Equipo</h2>
      
      <div style="display: flex; gap: 15px; width: 100%;">
        <div style="flex: 1;">
          <label for="cliente">Nombre del Cliente</label>
          <input type="text" id="cliente" v-model="form.cliente_nombre" placeholder="Ej: Roberto Gómez">
        </div>
        <div style="flex: 1;">
          <label for="equipo">Equipo</label>
          <input type="text" id="equipo" v-model="form.equipo" placeholder="Ej: Laptop HP Pavilion">
        </div>
      </div>

      <label for="problema" class="descripcion">Problema Reportado</label>
      <textarea id="problema" v-model="form.problema" placeholder="Describe la falla que reporta el cliente..." class="textarea-descripcion"></textarea>

      <div style="display: flex; gap: 15px; width: 100%;">
        <div style="flex: 1;">
          <label for="estado">Estado Inicial</label>
          <select id="estado" v-model="form.estado">
            <option value="En revisión">En revisión</option>
            <option value="Presupuestado">Presupuestado</option>
            <option value="En reparación">En reparación</option>
            <option value="Reparado">Reparado</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
        <div style="flex: 1;">
          <label for="costo">Costo Estimado ($)</label>
          <input type="number" id="costo" v-model="form.costo" min="0" step="10.00">
        </div>
      </div>

      <button type="submit" :disabled="guardando">
        {{ guardando ? 'Registrando...' : 'Registrar Reparación' }}
      </button>
      
      
      <p v-if="reparacionesStore.mensaje" class="correcto" style="margin-top: 10px;">{{ reparacionesStore.mensaje }}</p>
    </form>
    

    <div v-else class="formulario" style="text-align: center; padding: 40px;">
      <h2>🔒 Acceso Restringido</h2>
      <p style="color: #94a3b8; font-size: 18px;">Debes iniciar sesión en el sistema para registrar o modificar la base de datos.</p>
    </div>

    <div v-if="reparacionesStore.reparaciones.length > 0" class="lista">
      <ItemCard v-for="item in reparacionesStore.reparaciones" :key="item.id" @eliminar="confirmarEliminacion(item)">
        <template #titulo>
          <h2>{{ item.equipo }}</h2>
        </template>
        <p><strong>Cliente:</strong> {{ item.cliente_nombre }}</p>
        <p><strong>Problema:</strong> {{ item.problema }}</p>
        <p><strong>Estado:</strong> <span style="color: #38bdf8; font-weight: bold;">{{ item.estado }}</span></p>
        <p><strong>Costo:</strong> ${{ item.costo }}</p>
      </ItemCard>
    </div>
    <div v-else class="sin-contenido"><p>No hay equipos registrados en el taller actualmente.</p></div>
    
  </section>
</template>

<style scoped>
.contenedor { 
  max-width: 1024px; 
  margin: 30px auto; 
  padding: 20px; 
}

h1 { 
  text-align: center; 
  margin-bottom: 25px; 
  color: #f8fafc; 
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.resumen { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  gap: 20px; 
  margin-bottom: 25px; 
}

.dato { 
  background: rgba(30, 41, 59, 0.7); 
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px; 
  padding: 20px; 
  box-shadow: 0 8px 32px rgba(0,0,0,0.3); 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
}

.dato span { 
  color: #cbd5e1; 
  font-size: 16px; 
  font-weight: 500;
}

.dato strong { 
  font-size: 32px; 
  color: #38bdf8;
}

.formulario { 
  background: rgba(30, 41, 59, 0.7); 
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px; 
  padding: 30px; 
  margin-bottom: 30px; 
  box-shadow: 0 8px 32px rgba(0,0,0,0.3); 
}

.formulario h2 { 
  margin-top: 0; 
  color: #38bdf8; 
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 15px;
  margin-bottom: 20px;
}

label { 
  display: block; 
  margin-top: 15px; 
  margin-bottom: 8px; 
  font-weight: 600; 
  color: #e2e8f0; 
}

input, select { 
  width: 100%; 
  padding: 14px; 
  margin-bottom: 10px; 
  box-sizing: border-box; 
  border-radius: 10px; 
  background: rgba(15, 23, 42, 0.6); 
  border: 1px solid #475569; 
  color: #f8fafc;
  font-size: 15px; 
  transition: all 0.3s ease;
}

input:focus, select:focus { 
  outline: none; 
  border-color: #38bdf8; 
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25); 
}

.textarea-descripcion { 
  width: 100%; 
  min-height: 120px; 
  resize: vertical; 
  padding: 14px; 
  border-radius: 10px; 
  background: rgba(15, 23, 42, 0.6); 
  border: 1px solid #475569; 
  color: #f8fafc;
  font-size: 15px; 
  box-sizing: border-box; 
  transition: all 0.3s ease;
}

.textarea-descripcion:focus {
  outline: none; 
  border-color: #38bdf8; 
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25); 
}

button { 
  border: none; 
  background: linear-gradient(90deg, #0ea5e9, #2563eb); 
  color: white; 
  font-weight: bold; 
  font-size: 16px;
  cursor: pointer; 
  transition: all 0.3s ease; 
  margin-top: 20px; 
  padding: 14px 28px;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
}

button:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.5);
}

button:disabled { 
  opacity: 0.5; 
  cursor: not-allowed; 
  transform: none; 
}

.aviso { 
  color: #ef4444; 
  font-weight: bold; 
}

.correcto { 
  color: #10b981; 
  font-weight: bold; 
}

.lista { 
  display: grid; 
  gap: 20px; 
}

.sin-contenido { 
  background: rgba(30, 41, 59, 0.7); 
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px; 
  border-radius: 14px; 
  text-align: center; 
  color: #94a3b8; 
  box-shadow: 0 8px 32px rgba(0,0,0,0.3); 
  font-size: 16px;
}
</style>