import { Routes } from '@angular/router';
import {authGuard} from './services/auth.guard';
import { LandingPageComponent } from './pages/landingPage/landingPage.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landingPage/landingPage.component').then(m => m.LandingPageComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/loginPage/loginPage.component').then(m => m.LoginPageComponent)
    }
    // {
    //     canActivate: [authGuard],
    //     path: 'flights',
    //     loadComponent: () => import('./flights_page/flights-page.component').then(m => m.FlightsPageComponent),
    //     children: [
    //         {path: '', loadComponent: () => import('./flights_page/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)},
    //         {path: 'list', loadComponent: () => import('./flights_page/flights-list/flights-list.component').then(m => m.FlightsListComponent)},
    //         {path: 'add', loadComponent: () => import('./flights_page/add-flight-page/add-flight-page.component').then(m=>m.AddFlightPageComponent)},
    //         {path: 'logbook', loadComponent: () => import('./flights_page/logbook_page/logbook_page.component').then(m=>m.LogbookPageComponent)},
    //     ]
    // },
];
