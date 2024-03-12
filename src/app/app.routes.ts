import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'webapp', loadChildren: () => import('./webapp/webapp.module').then(m => m.WebappModule) }

];
