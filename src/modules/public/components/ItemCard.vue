<script setup>
import { ref, computed } from 'vue';
import { useSessionStore } from '@/modules/auth/stores/sessionStore';

const sessionStore = useSessionStore();

const propiedades = defineProps({
  destacado: Boolean,
  // propiedad para recibir la categoría desde la base de datos
  categoria: { type: String, default: 'General' }
});

const emitir = defineEmits(['eliminar']);

const expandido = ref(false);

const textoBoton = computed(() => {
  return expandido.value ? 'Compactar' : 'Expandir';
});

function alternarVista() {
  expandido.value = !expandido.value;
}

function eliminarTarjeta() {
  emitir('eliminar');
}

// Diccionario inteligente de imágenes basado en la categoría
const imagenAsignada = computed(() => {
  const diccionarioImagenes = {
    'Tarjetas Madre': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    'Procesadores': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    'Memoria RAM': 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRjQT5ZW9k7VubYWjq1Dcn_a8e1U9Xd4a0QgGB1Zon4aPrfJGLptL4XNQ5zNi0fKTiMXEsWuUpW9hWzxFXGduujF9O0-AVoAptAYiELKrQqCEziiIrS16c7uh9sw6yynV5_JP9G2buGq1M&usqp=CAc',
    'Tarjetas Gráficas': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80',
    'Almacenamiento': 'https://www.zegucom.com.mx/productos/WDS100T2G0C/img_1.jpg',
    'Fuentes de Poder': 'https://m.media-amazon.com/images/I/81pahkoLgtL.jpg',
    'Gabinetes': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    'Refrigeración': 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=400&q=80',
    'Periféricos': 'data:image/jpeg;base64,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',
    'General': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80' // Imagen para el taller
  };
  return diccionarioImagenes[propiedades.categoria] || diccionarioImagenes['General'];
});
</script>

<template>
  <article :class="['tarjeta-oscura', { destacado: propiedades.destacado }]">
    <div class="disposicion-tarjeta">
      
      <div class="caja-imagen">
        <img :src="imagenAsignada" alt="Fotografía del equipo" class="imagen-componente" />
      </div>

      <div class="caja-informacion">
        <div class="encabezado">
          <div class="titulo">
            <slot name="titulo">
              <h2>Sin Titulo</h2>
            </slot>
          </div>
          <div class="acciones">
            <button class="boton-alternar" @click="alternarVista">{{ textoBoton }}</button>
            <button v-if="sessionStore.autenticado" class="boton-eliminar" @click="eliminarTarjeta">Eliminar</button>
          </div>
        </div>

        <p v-if="propiedades.destacado" class="marca-destacado">⭐ Artículo Destacado</p>

        <div v-if="expandido" class="contenido-extra">
          <slot>
            <p>No se proporcionó información</p>
          </slot>
        </div>
        <div v-else class="vista-compacta">
          <p>Haz clic en el botón Expandir para consultar características.</p>
        </div>
      </div>

    </div>
  </article>
</template>

<style scoped>
.tarjeta-oscura {
  background: rgba(30, 41, 59, 0.85); /* Fondo Dark Mode */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  color: #f8fafc;
}

.tarjeta-oscura:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
  border-color: rgba(56, 189, 248, 0.3);
}

.destacado {
  border-left: 4px solid #facc15;
}

.disposicion-tarjeta {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.caja-imagen {
  flex-shrink: 0;
}

.imagen-componente {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.caja-informacion {
  flex-grow: 1;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.titulo :deep(h2) {
  margin: 0;
  font-size: 22px;
  color: #38bdf8; /* Azul Tech */
}

.acciones {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

button {
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  transition: 0.2s ease;
}

.boton-alternar {
  background: #334155;
}

.boton-alternar:hover {
  background: #475569;
}

.boton-eliminar {
  background: #dc2626;
}

.boton-eliminar:hover {
  background: #ef4444;
}

.marca-destacado {
  margin-top: 8px;
  color: #facc15;
  font-weight: bold;
  font-size: 14px;
}

.marca-normal {
  display: none; 
}

.contenido-extra {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

.vista-compacta {
  margin-top: 10px;
  color: #94a3b8;
  font-style: italic;
  font-size: 14px;
}

@media (max-width: 600px) {
  .disposicion-tarjeta {
    flex-direction: column;
  }
  .imagen-componente {
    width: 100%;
    height: 180px;
  }
}
</style>