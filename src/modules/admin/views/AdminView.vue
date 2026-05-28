<script setup>
    import { inject } from 'vue';
    import { useSessionStore } from '@/modules/auth/stores/sessionStore';
    import { useControlStore } from '@/modules/admin/stores/controlStore';

    const sessionStore = useSessionStore()
    const controlStore = useControlStore()

    const nombreUsuarioGlobal = inject('nombreUsuarioGlobal')
</script>


<template>
    <section>
        <h2>Panel Administrativo</h2>
        <p>Usuario Global: <strong>{{ nombreUsuarioGlobal }}</strong></p>
        <p>Autenticado: <strong> {{ sessionStore.autenticado ? 'Si': 'No' }}</strong></p>
        <p>Notificaciones: <strong> {{ controlStore.notificaciones }}</strong></p>
    </section>
</template>

<style scoped>
</style>