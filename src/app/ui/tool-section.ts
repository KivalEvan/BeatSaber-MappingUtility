import { Component, input } from '@angular/core';

@Component({
   selector: 'section[appToolSection]',
   host: {
      class: 'tool-panel',
      '[id]': 'id()',
      '[attr.aria-labelledby]': 'id() + "-title"',
   },
   template: `
      <header class="tool-panel__header">
         <h2 [id]="id() + '-title'">{{ heading() }}</h2>
      </header>
      <div class="tool-panel__content"><ng-content /></div>
   `,
})
export class ToolSection {
   readonly id = input.required<string>();
   readonly heading = input.required<string>();
}
