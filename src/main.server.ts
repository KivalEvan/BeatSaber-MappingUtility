import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser';
import { provideServerRendering, RenderMode, withRoutes } from '@angular/ssr';
import { App } from './app/app';
import { appConfig } from './app/app.config';

const serverConfig = mergeApplicationConfig(appConfig, {
   providers: [
      provideServerRendering(withRoutes([{ path: '**', renderMode: RenderMode.Prerender }])),
   ],
});

export default function bootstrap(context: BootstrapContext) {
   return bootstrapApplication(App, serverConfig, context);
}
