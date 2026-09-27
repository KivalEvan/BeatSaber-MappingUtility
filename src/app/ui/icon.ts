import { Component, input } from '@angular/core';

export type IconName = 'timing' | 'jump' | 'color' | 'difficulty' | 'pattern' | 'menu' | 'close';

@Component({
   selector: 'app-icon',
   template: `
      <svg
         class="icon"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         stroke-width="1.7"
         stroke-linecap="round"
         stroke-linejoin="round"
         aria-hidden="true"
      >
         @for (path of paths[name()]; track path) {
            <path [attr.d]="path" />
         }
      </svg>
   `,
   styles: `
      :host {
         display: contents;
      }
      :where(.icon) {
         width: var(--icon-size, 1.4rem);
         height: var(--icon-size, 1.4rem);
         flex: 0 0 auto;
      }
   `,
})
export class Icon {
   readonly name = input.required<IconName>();
   readonly paths: Record<IconName, readonly string[]> = {
      timing: ['M4 12h3l3-7 4 14 3-7h3', 'M4 4v2m16 12v2'],
      jump: ['M4 17V7m16 10V7M4 12h16m-4-4 4 4-4 4M4 20h16'],
      color: [
         'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.8 1.8 0 0 1 1-3.3h2a4 4 0 0 0 4-4c0-4-4-7-9-7Z',
         'M7 10h.01M10 7h.01M15 7h.01M17 10h.01',
      ],
      difficulty: ['M4 6h16M4 12h16M4 18h16', 'M8 4v4m8 2v4m-5 2v4'],
      pattern: ['M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'],
      menu: ['M4 6h16M4 12h16M4 18h16'],
      close: ['M5 5l14 14M19 5 5 19'],
   };
}
