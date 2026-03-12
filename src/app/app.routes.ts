import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadComponent: () => import('./features/welcome/welcome.component').then(m => m.WelcomeComponent),
        data: { title: 'appTitles.welcomeTitle' }
    },
    {
        path: 'style-guide',
        loadComponent: () => import('./features/style-guide/style-guide.component').then(m => m.StyleGuideComponent),
        data: { title: 'appTitles.stylesTitle' }
    },
    {
        path: 'carousel',
        loadComponent: () => import('./shared/components/carousel/carousel.component').then(m => m.CarouselComponent)
    }
];
