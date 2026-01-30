import { Routes } from '@angular/router';
import {notLoggedInGuard} from './services/notLoggedIn.guard';
import {authGuard} from './services/auth.guard';
import { LandingPageComponent } from './pages/landingPage/landingPage.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/landingPage/landingPage.component').then(m => m.LandingPageComponent)
    },
    {
        canActivate: [notLoggedInGuard],
        path: 'login',
        loadComponent: () => import('./pages/loginPage/loginPage.component').then(m => m.LoginPageComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/registerPage/registerPage.component').then(m => m.RegisterPageComponent)
    },
    {
        canActivate: [authGuard],
        path: 'logout',
        loadComponent: () => import('./pages/logoutPage/logoutPage.component').then(m => m.LogoutPageComponent)
    },
    {
        canActivate: [authGuard],
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboardPage/dashboardPage.component').then(m => m.DashboardPageComponent)
    },
    {
        canActivate: [authGuard],
        path: 'flights',
        loadComponent: () => import('./pages/flightsPage/flightsPage.component').then(m => m.FlightsPageComponent)
    },
    {
        canActivate: [authGuard],
        path: 'flights/add',
        loadComponent: () => import('./pages/addFlightPage/addFlightPage.component').then(m => m.AddFlightPageComponent)
    },
    {
        canActivate: [authGuard],
        path: 'aircraft/:registration',
        loadComponent: () => import('./pages/aircraftPage/aircraftPage.component').then(m => m.AircraftPageComponent)
    },
    {
        canActivate: [authGuard],
        path: 'aircraft',
        loadComponent: () => import('./pages/aircraftPage/aircraftPage.component').then(m => m.AircraftPageComponent)
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
