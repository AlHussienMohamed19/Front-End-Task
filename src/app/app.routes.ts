import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () =>
            import('./Modules/modules/modules.module').then(m => m.ModulesModule)
    },
    {
        path: '**',
        redirectTo: 'pages',
        pathMatch: 'full'
    }
];
