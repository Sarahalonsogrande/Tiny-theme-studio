import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadComponent: () => import('./features/story-root/story-root.component').then(m => m.StoryRootComponent),
        data: { title: 'appTitles.welcomeTitle' }
    },
    {
        path: 'storytelling',
        loadComponent: () => import('./features/story-root/story-chapters/story-chapters.component').then(m => m.StoryChaptersComponent),
        data: { title: 'appTitles.stylesTitle' }
    },
    {
        path: 'story-prologue',
        loadComponent: () => import('./features/story-root/story-prologue/story-prologue.component').then(m => m.StoryPrologueComponent)
    },
    {
        path: 'carousel',
        loadComponent: () => import('./shared/components/carousel/carousel.component').then(m => m.CarouselComponent)
    }
];
