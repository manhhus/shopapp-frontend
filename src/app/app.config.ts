import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthGuard } from './webapp/guards/auth.guard';
import { JWT_OPTIONS, JwtHelperService, JwtModuleOptions } from '@auth0/angular-jwt';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), 
    AuthGuard, JwtHelperService,   { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    NgbPopoverConfig
  ],
};
