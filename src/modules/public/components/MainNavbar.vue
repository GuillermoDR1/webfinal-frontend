<script setup>
import { computed } from 'vue';
import { useSessionStore } from '@/modules/auth/stores/sessionStore';

const sessionStore = useSessionStore();
const nombreUsuario = computed(() => sessionStore.nombreBienvenida);
const tipoPlan = computed(() => sessionStore.tipoPlan);
</script>

<template>
  <header class="navbar">
    <div class="brand">
      <span class="logo">💻</span>
      <div>
        <h1>TechFix & Ventas</h1>
        <p>Catálogo de componentes y seguimiento de equipos</p>
      </div>
    </div>
    <nav class="links">
      <RouterLink to="/"> Inicio </RouterLink>
      <RouterLink to="/componentes"> Inventario </RouterLink>
      <RouterLink to="/reparaciones"> Taller </RouterLink>
      <RouterLink to="/perfil"> Perfil </RouterLink>
      <RouterLink to="/login"> Acceder </RouterLink>
    </nav>
    <div class="user-box">
      <span>{{ nombreUsuario }}</span>
      <small>{{ tipoPlan }}</small>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1.2fr 2fr auto;
  gap: 24px;
  align-items: center;
  padding: 18px 24px;
  /* Efecto de cristal oscuro */
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  font-size: 28px;
}

.brand h1 {
  margin: 0;
  font-size: 22px;
  color: #f8fafc;
}

.brand p {
  margin: 2px 0 0;
  font-size: 14px;
  color: #94a3b8;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.links a {
  text-decoration: none;
  color: #cbd5e1;
  background: transparent;
  padding: 10px 14px;
  border-radius: 12px;
  transition: all 0.3s ease ;
  font-weight: 500;
  cursor: pointer;
}

.links a:hover, .links a.router-link-active {
  color: white;
  background: #0ea5e9;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
}

.user-box {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 14px;
}

.user-box span {
  font-weight: bold;
  font-size: 18px;
  color: #38bdf8;
}

.user-box small {
  color: #94a3b8;
  font-size: 12px;
}

@media (max-width: 900px) {
  .navbar {
      grid-template-columns: 1fr;
      text-align: center;
  }

  .brand, .user-box {
      justify-content: center;
      align-items: center;
  }
}
</style>