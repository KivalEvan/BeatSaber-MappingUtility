import { type ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
   providers: [provideRouter([]), provideClientHydration(withEventReplay())],
};
