<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useComponentesStore } from '@/modules/public/stores/componentesStore';
import ItemCard from '@/modules/public/components/ItemCard.vue';
import { useSessionStore } from '@/modules/auth/stores/sessionStore';

const componentesStore = useComponentesStore()
const sessionStore = useSessionStore();

const form = reactive({
  nombre: '', categoria: '', descripcion: '', precio: 1, stock: 1, activo: true
})

const guardando = ref(false)
const eliminando = ref(false)
const registroEliminando = ref('')

const formularioValido = computed(() => {
  return (form.nombre.trim() !== '' && form.categoria.trim() !== '' && form.descripcion.trim() !== '' && Number(form.precio) > 0 && Number(form.stock) >= 0)
})

async function procesarFormulario() {
  if (!formularioValido.value) return

  guardando.value = true
  const nuevoComponente = {
    nombre: form.nombre,
    categoria: form.categoria,
    descripcion: form.descripcion,
    precio: Number(form.precio),
    stock: Number(form.stock),
    activo: 1
  }
  
  try {
    await componentesStore.agregarComponente(nuevoComponente)
    if (!componentesStore.error) {
      form.nombre = ''
      form.categoria = ''
      form.descripcion = ''
      form.precio = 1
      form.stock = 1
    }
  } finally {
    guardando.value = false
  }
}

onMounted(() => {
  componentesStore.cargarComponentes()
})

async function confirmarDesactivacion(item) {
  const confirmar = window.confirm(`¿Seguro que deseas ocultar el componente "${item.nombre}" del inventario?`)
  if (!confirmar) return

  eliminando.value = true
  registroEliminando.value = item.nombre
  try {
    await componentesStore.desactivarComponente(item.id)
  } finally {
    eliminando.value = false
    registroEliminando.value = ''
  }
}
</script>

<template>
  <section class="contenedor">
    <h1>📦 Inventario de Componentes</h1>
    
    <p v-if="componentesStore.cargando" class="aviso">Cargando inventario desde la base de datos...</p>
    <p v-else-if="componentesStore.error" class="aviso"> Error: {{ componentesStore.error }}</p>

    <div class="resumen">
      <div class="dato">
        <span>Total Componentes</span>
        <strong>{{ componentesStore.totalElementos }}</strong>
      </div>
      <div class="dato">
        <span>Piezas en Stock</span>
        <strong>{{ componentesStore.totalEnStock }}</strong>
      </div>
      <div class="dato">
        <span>Precio Promedio</span>
        <strong>${{ componentesStore.promedioValor }}</strong>
      </div>
    </div>

    <form class="formulario" v-if="sessionStore.autenticado" @submit.prevent="procesarFormulario">
      <h2>➕ Registrar Nuevo Hardware</h2>
      
      <label for="nombre">Nombre del Componente</label>
      <input type="text" id="nombre" v-model="form.nombre" placeholder="Ej: Tarjeta Madre ASUS ROG" @keyup.enter="procesarFormulario">

      <label for="categoria" class="categoria">Categoría</label>
      <select id="categoria" v-model="form.categoria">
        <option value="">Selecciona una categoría</option>
        <option v-for="item in componentesStore.categorias" :key="item" :value="item">{{ item }}</option>
      </select>

      <label for="descripcion" class="descripcion">Descripción Técnica</label>
      <textarea id="descripcion" v-model="form.descripcion" placeholder="Detalles, compatibilidad, marca..." class="textarea-descripcion"></textarea>

      <div style="display: flex; gap: 15px; width: 100%;">
        <div style="flex: 1;">
          <label for="precio" class="precio">Precio ($)</label>
          <input type="number" id="precio" style="width: 100%;" v-model="form.precio" min="1" step="0.50">
        </div>
        <div style="flex: 1;">
          <label for="stock" class="precio">Stock (Cantidad)</label>
          <input type="number" id="stock" style="width: 100%;" v-model="form.stock" min="0">
        </div>
      </div>

      <button type="submit">Guardar en Inventario</button>
      <p v-if="!formularioValido" class="aviso" style="font-size: 0.85em; margin-top: 10px;">Completa todos los campos para poder guardar.</p>
      
      <p v-if="componentesStore.mensaje" class="correcto" style="margin-top: 10px;">{{ componentesStore.mensaje }}</p>
    </form>

    <div v-else class="formulario" style="text-align: center; padding: 40px;">
      <h2>🔒 Acceso Restringido</h2>
      <p style="color: #94a3b8; font-size: 18px;">Debes iniciar sesión en el sistema para registrar o modificar la base de datos.</p>
    </div>

    <div v-if="componentesStore.componentesActivos.length > 0" class="lista">
      <ItemCard v-for="item in componentesStore.componentesActivos" :key="item.id" :categoria="item.categoria" @eliminar="confirmarDesactivacion(item)">
        <template #titulo>
          <h2>{{ item.nombre }}</h2>
        </template>
        <p><strong>Categoría:</strong> {{ item.categoria }}</p>
        <p><strong>Descripción:</strong> {{ item.descripcion }}</p>
        <p><strong>Precio:</strong> ${{ item.precio }}</p>
        <p><strong>En Stock:</strong> {{ item.stock }} unidades</p>
      </ItemCard>
    </div>
    <div v-else class="sin-contenido"><p>No hay componentes registrados en el inventario.</p></div>
    
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
  color: #38bdf8; /* Azul neón */
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