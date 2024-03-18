import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', loadChildren: () => import('./webapp/webapp.module').then(m => m.WebappModule) }

];
