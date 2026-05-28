import { defineStore } from "pinia";
import { ref, computed } from 'vue';

const URL_BACKEND = "http://127.0.0.1:5000";

export const useComponentesStore = defineStore('componentes', () => {
  // Categorías para la tienda de PC
  const categorias = ref(['Tarjetas Madre', 'Procesadores', 'Memoria RAM', 'Almacenamiento', 'Tarjetas Gráficas', 'Fuentes de Poder', 'Gabinetes', 'Refrigeración', 'Periféricos']);

  const componentes = ref([]);
  const mensaje = ref("");
  const error = ref("");
  const cargando = ref(false);

  // Estadísticas para el panel
  const totalElementos = computed(() => componentesActivos.value.length);
  const totalEnStock = computed(() => {
    return componentesActivos.value.reduce((acumulado, item) => acumulado + Number(item.stock), 0);
  });

  const promedioValor = computed(() => {
    if (componentesActivos.value.length === 0) return 0;
    const suma = componentesActivos.value.reduce((acumulado, item) => acumulado + Number(item.precio), 0);
    return (suma / componentesActivos.value.length).toFixed(2);
  });

  const componentesActivos = computed(() => {
    return componentes.value.filter(item => item.activo == 1 || item.activo === true);
  });

  // Peticiones Fetch al Backend (Flask)
  async function cargarComponentes() {
    cargando.value = true;
    error.value = "";
    try {
      const respuesta = await fetch(`${URL_BACKEND}/componentes`);
      const datos = await respuesta.json();
      
      if (!respuesta.ok) throw new Error(datos.mensaje || "No se pudieron cargar los componentes");
      componentes.value = datos;
    } catch (err) {
      error.value = err.message;
    } finally {
      cargando.value = false;
    }
  }

  async function agregarComponente(nuevoComponente) {
    mensaje.value = "";
    error.value = "";
    try {
      const respuesta = await fetch(`${URL_BACKEND}/componentes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nuevoComponente.nombre,
          categoria: nuevoComponente.categoria,
          descripcion: nuevoComponente.descripcion,
          precio: Number(nuevoComponente.precio),
          stock: Number(nuevoComponente.stock),
          activo: nuevoComponente.activo ? 1 : 0
        })
      });
      
      const resultado = await respuesta.json();
      
      if (!respuesta.ok) {
        // Formateamos los errores que nos manda Flask
        const detalle = resultado.errores ? Object.values(resultado.errores).join(', ') : (resultado.mensaje || 'Error al guardar');
        throw new Error(detalle);
      }
      
      mensaje.value = resultado.mensaje;
      await cargarComponentes(); // Recargamos la tabla automáticamente
    } catch (err) {
      error.value = err.message;
    }
  }

  async function desactivarComponente(id) {
    mensaje.value = '';
    error.value = '';
    try {
      const respuesta = await fetch(`${URL_BACKEND}/componentes/${id}/desactivar`, { method: 'PUT' });
      if (respuesta.ok) await cargarComponentes();
    } catch (err) {
      console.log("Endpoint de desactivación pendiente en Flask", err);
    }
  }

  return {
    categorias, componentes, totalElementos, totalEnStock, promedioValor, componentesActivos,
    mensaje, error, cargando, cargarComponentes, agregarComponente, desactivarComponente
  }
});