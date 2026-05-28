import { defineStore } from "pinia";
import { ref, computed } from 'vue';

const URL_BACKEND = "http://127.0.0.1:5000";

export const useReparacionesStore = defineStore('reparaciones', () => {
  // Variables de estado
  const reparaciones = ref([]);
  const mensaje = ref("");
  const error = ref("");
  const cargando = ref(false);

  // Estadísticas rápidas para el panel
  const totalReparaciones = computed(() => reparaciones.value.length);
  const equiposEnRevision = computed(() => {
    return reparaciones.value.filter(item => item.estado === 'En revisión').length;
  });

  // Petición GET para traer los datos desde Flask
  async function cargarReparaciones() {
    cargando.value = true;
    error.value = "";
    try {
      const respuesta = await fetch(`${URL_BACKEND}/reparaciones`);
      const datos = await respuesta.json();
      
      if (!respuesta.ok) throw new Error(datos.mensaje || "No se pudieron cargar las reparaciones");
      reparaciones.value = datos;
    } catch (err) {
      error.value = err.message;
    } finally {
      cargando.value = false;
    }
  }

  // Petición POST para guardar un nuevo equipo en el taller
  async function agregarReparacion(nuevaReparacion) {
    mensaje.value = "";
    error.value = "";
    try {
      const respuesta = await fetch(`${URL_BACKEND}/reparaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente_nombre: nuevaReparacion.cliente_nombre,
          equipo: nuevaReparacion.equipo,
          problema: nuevaReparacion.problema,
          estado: nuevaReparacion.estado || "En revisión",
          costo: Number(nuevaReparacion.costo || 0)
        })
      });
      
      const resultado = await respuesta.json();
      
      if (!respuesta.ok) {
        // Formateamos los errores que nos manda Flask si faltan datos
        const detalle = resultado.errores ? Object.values(resultado.errores).join(', ') : (resultado.mensaje || 'Error al registrar la reparación');
        throw new Error(detalle);
      }
      
      mensaje.value = resultado.mensaje;
      await cargarReparaciones(); // Recargamos la lista automáticamente
    } catch (err) {
      error.value = err.message;
    }
  }

      const eliminarReparacion = async (id) => {
    try {
      // Hacemos la petición DELETE al backend
      const respuesta = await fetch(`http://127.0.0.1:5000/reparaciones/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        reparaciones.value = reparaciones.value.filter(item => item.id !== id);
        console.log("Equipo eliminado del taller con éxito.");
      } else {
        console.error("El servidor rechazó la petición de eliminado.");
      }
    } catch (error) {
      console.error("Error al intentar conectar con Flask:", error);
    }
  }

  return { 
    reparaciones, totalReparaciones, equiposEnRevision, 
    mensaje, error, cargando, cargarReparaciones, 
    agregarReparacion, eliminarReparacion 
  }
});