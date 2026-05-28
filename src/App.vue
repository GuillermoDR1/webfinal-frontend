<script setup>
  import { provide, computed } from 'vue';
  import { useSessionStore } from '@/modules/auth/stores/sessionStore';
  import MainNavbar from '@/modules/public/components/MainNavbar.vue';

  const sessionStore = useSessionStore();
  const nombreUsuarioGlobal = computed(() => sessionStore.nombreBienvenida);
  const tipoPlanGlobal = computed(() => sessionStore.tipoPlan)

  provide('nombreUsuarioGlobal', nombreUsuarioGlobal)
  provide('tipoPlanGlobal', tipoPlanGlobal)
</script>


<template>
  <div class="app-shell">
    <MainNavbar />
    <main class="contenedor-pagina"> 
      <RouterView />
    </main>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #0f172a; 
  box-sizing: border-box;
}
</style>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0; 
}

.contenedor-pagina {
  max-width: 1024px;
  margin: 0 auto;
  padding: 28px 20px 40px;
}
</style>
