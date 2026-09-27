import { Component } from '@angular/core';
import { version } from '../../../package.json';

@Component({
   selector: 'app-watermark',
   template: `
      <div class="watermark">
         <a href="https://kivalevan.github.io/">@kivalevan</a>
         <a href="https://github.com/KivalEvan/BeatSaber-MappingUtility/blob/main/CHANGELOG.md">{{
            version
         }}</a>
      </div>
   `,
   styles: `
      :host {
         display: contents;
      }
      .watermark {
         display: flex;
         align-items: center;
         gap: 1.25rem;
      }
      .watermark a {
         text-decoration: none;
      }
   `,
})
export class Watermark {
   readonly version = version;
}
