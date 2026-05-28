import LandingView from '@/modules/public/submodules/home/views/LandingView.vue';
import AccountView from '@/modules/public/submodules/profiles/views/AccountView.vue';

import ComponentesView from '@/modules/public/views/ComponentesView.vue';
import ReparacionesView from '@/modules/public/views/ReparacionesView.vue';

const PublicRoutes = [
    {path: '/', name: 'inicio', component: LandingView},
    {path: '/perfil', name: 'perfil', component: AccountView},
    
    // Nuestras nuevas rutas conectadas al menú superior
    {path: '/componentes', name: 'componentes', component: ComponentesView},
    {path: '/reparaciones', name: 'reparaciones', component: ReparacionesView},
]

export default PublicRoutes