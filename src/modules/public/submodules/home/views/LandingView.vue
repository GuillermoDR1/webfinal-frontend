<script setup>
import { inject } from 'vue';
const nombreUsuarioGlobal = inject('nombreUsuarioGlobal')
const tipoPlanGlobal = inject('tipoPlanGlobal')
</script>

<template>
  <section class="hero">
    <div class="capa-oscura"></div> 
    
    <div class="contenido-hero">
      <div class="hero-text">
        <p class="bienvenida">Bienvenido a TechFix & Ventas</p>
        <h2>Gestión de inventario de hardware y seguimiento de reparaciones</h2>
        
        <div class="info-usuario">
            <p>Usuario Actual: <strong>{{ nombreUsuarioGlobal }}</strong></p>
            <p>Nivel de acceso: <strong>{{ tipoPlanGlobal }}</strong></p>
        </div>
        <br>
        <RouterLink to="/componentes" class="hero-btn"> ⚡ Gestionar Inventario </RouterLink>
      </div>

      <div class="hero-card">
        <h3>Módulos del Sistema</h3>
        <ul>
          <li>📦 Control de existencias de hardware</li>
          <li>💰 Valorización de componentes</li>
          <li>🛠️ Registro y estado de equipos en taller</li>
          <li>🚀 Arquitectura con Vue 3 y Flask</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
    position: relative;
    min-height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2000&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.capa-oscura {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.7) 100%);
    z-index: 1;
}

.contenido-hero {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 40px;
    width: 100%;
    max-width: 1100px;
    padding: 40px;
    align-items: center;
}

.hero-text {
    color: #e2e8f0;
}

.bienvenida {
    color: #38bdf8; /* Azul neón claro */
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 18px;
    margin-bottom: 10px;
}

.hero h2 {
    font-size: 38px;
    margin: 0 0 20px ;
    color: #ffffff;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.info-usuario {
    background: rgba(255, 255, 255, 0.05);
    padding: 15px 20px;
    border-radius: 12px;
    border-left: 4px solid #38bdf8;
    backdrop-filter: blur(5px);
    display: inline-block;
}

.info-usuario p {
    margin: 5px 0;
    font-size: 15px;
}

.info-usuario strong {
    color: #38bdf8;
}

.hero-btn {
    display: inline-block;
    text-decoration: none;
    background: linear-gradient(90deg, #0ea5e9, #2563eb);
    color: white;
    padding: 14px 28px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

.hero-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(14, 165, 233, 0.6);
}

.hero-card {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
}

.hero-card h3 {
    margin-top: 0;
    color: #38bdf8;
    font-size: 22px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.hero-card ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
}

.hero-card li {
    margin-bottom: 18px;
    font-size: 16px;
}

@media (max-width: 900px) {
    .contenido-hero {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .info-usuario {
        border-left: none;
        border-top: 4px solid #38bdf8;
    }
}
</style>