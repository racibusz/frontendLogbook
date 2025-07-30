import { Routes } from '@angular/router';
import { HomePageComponent } from './home_page/home-page.component';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'login',
        loadComponent: () => import('./login_page/login-page.component').then(m => m.LoginPageComponent)
    },
    {
        canActivate: [authGuard],
        path: 'flights',
        loadComponent: () => import('./flights_page/flights-page.component').then(m => m.FlightsPageComponent),
        children: [
            {path: '', loadComponent: () => import('./flights_page/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)},
            {path: 'list', loadComponent: () => import('./flights_page/flights-list/flights-list.component').then(m => m.FlightsListComponent)},
        ]
    },
    {
        // canActivate: [authGuard],
        path: 'logout',
        loadComponent: () => import('./logout_page/logout-page.component').then(m=>m.LoginPageComponent),
    }
];
