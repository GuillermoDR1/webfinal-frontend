<script setup>
import { useSessionStore } from '@/modules/auth/stores/sessionStore';
import { inject } from 'vue';

const sessionStore = useSessionStore();
const nombreUsuarioGlobal = inject('nombreUsuarioGlobal');
const tipoPlanGlobal = inject('tipoPlanGlobal');
</script>

<template>
  <section class="perfil contenedor">
    <h2>👤 Perfil del Usuario</h2>
    
    <div class="perfil-box">
      <p>
        <strong>Usuario Global:</strong> 
        <span>{{ nombreUsuarioGlobal }}</span>
      </p>
      <p>
        <strong>Plan Global:</strong> 
        <span>{{ tipoPlanGlobal }}</span>
      </p>
      <p>
        <strong>Autenticado:</strong> 
        <span :class="sessionStore.autenticado ? 'activo' : 'inactivo'">
          {{ sessionStore.autenticado ? 'Sí' : 'No' }}
        </span>
      </p>
      <p>
        <strong>Usuario Premium:</strong> 
        <span :class="sessionStore.esPremium ? 'activo' : 'inactivo'">
          {{ sessionStore.esPremium ? 'Sí' : 'No' }}
        </span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.contenedor {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #f8fafc;
  margin-bottom: 30px;
  font-size: 28px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.perfil-box {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.perfil-box p {
  margin: 0;
  font-size: 18px;
  color: #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 15px;
}

.perfil-box p:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.perfil-box strong {
  color: #38bdf8; 
  font-weight: 600;
}

.perfil-box span {
  background: rgba(15, 23, 42, 0.6);
  padding: 6px 14px;
  border-radius: 10px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.activo {
  color: #10b981; 
}

.inactivo {
  color: #ef4444; 
}
</style>