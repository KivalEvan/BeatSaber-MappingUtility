import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
   afterNextRender,
   Component,
   DestroyRef,
   ElementRef,
   inject,
   Injector,
   signal,
   viewChild,
   viewChildren,
} from '@angular/core';
import { Icon, type IconName } from './ui/icon';
import { Watermark } from './ui/watermark';
import { Ebpm } from './tools/ebpm/ebpm';
import { NjsCalculator } from './tools/njs-calculator/njs-calculator';
import { SpsDifference } from './tools/sps-difference/sps-difference';
import { ColorPicker } from './tools/color-picker/color-picker';
import { RandomPatternGenerator } from './tools/random-pattern-generator/random-pattern-generator';

type ToolId =
   'ebpm-precision' | 'njs-calculator' | 'color-picker' | 'sps-difference' | 'random-pattern';

interface ToolDefinition {
   readonly id: ToolId;
   readonly name: string;
   readonly icon: IconName;
}

@Component({
   selector: 'app-root',
   imports: [
      NgTemplateOutlet,
      Icon,
      Watermark,
      Ebpm,
      NjsCalculator,
      SpsDifference,
      ColorPicker,
      RandomPatternGenerator,
   ],
   templateUrl: './app.html',
   styleUrl: './app.scss',
   host: {
      '(window:hashchange)': 'syncHash()',
      '(window:popstate)': 'syncHash()',
   },
})
export class App {
   private readonly document = inject(DOCUMENT);
   private readonly destroyRef = inject(DestroyRef);
   private readonly injector = inject(Injector);

   private readonly drawer = viewChild.required<ElementRef<HTMLDialogElement>>('drawer');
   private readonly navigationTrigger =
      viewChild.required<ElementRef<HTMLButtonElement>>('navigationTrigger');
   private readonly workspace = viewChild.required<ElementRef<HTMLElement>>('workspace');
   private readonly navigation = viewChild<ElementRef<HTMLElement>>('navigation');
   private readonly toolLinks = viewChildren<ElementRef<HTMLAnchorElement>>('toolLink');

   private closeFocus: 'trigger' | 'workspace' = 'trigger';

   protected readonly theme = signal('dark');

   // Null keeps all prerendered tools accessible until Angular initializes navigation.
   protected readonly activeTool = signal<ToolId | null>(null);
   protected readonly isCompact = signal(false);
   protected readonly drawerOpen = signal(false);

   protected readonly tools: readonly ToolDefinition[] = [
      { id: 'ebpm-precision', name: 'EBPM & Precision', icon: 'timing' },
      { id: 'njs-calculator', name: 'NJS Calculator', icon: 'jump' },
      { id: 'color-picker', name: 'Color Picker', icon: 'color' },
      { id: 'sps-difference', name: 'SPS Difference', icon: 'difficulty' },
      { id: 'random-pattern', name: 'Random Pattern', icon: 'pattern' },
   ];

   constructor() {
      afterNextRender(() => {
         this.changeTheme(this.document.documentElement.dataset['theme'] || 'dark');

         const compactViewport = window.matchMedia('(max-width: 900px)');
         const onViewportChange = (event: MediaQueryListEvent) =>
            this.updateLayout(event.matches, true);

         compactViewport.addEventListener('change', onViewportChange);
         this.destroyRef.onDestroy(() => {
            compactViewport.removeEventListener('change', onViewportChange);
         });

         this.syncHash();
         this.updateLayout(compactViewport.matches);
      });
   }

   protected changeTheme(value: string) {
      this.theme.set(value);
      this.document.documentElement.dataset['theme'] = value;
      this.document
         .querySelector('meta[name="theme-color"]')
         ?.setAttribute('content', value === 'light' ? '#edf2f7' : '#080b10');

      try {
         localStorage.setItem('mapping-utility-theme', value);
      } catch {
         // Theme persistence is optional when browser storage is unavailable.
      }
   }

   protected syncHash() {
      const id = window.location.hash.slice(1);
      const tool = this.tools.find((tool) => tool.id === id);

      if (tool) {
         this.activeTool.set(tool.id);
      } else if (id === '' || id === 'map-tools' || this.activeTool() === null) {
         this.activeTool.set(this.tools[0].id);
      }
   }

   protected onToolClick(event: MouseEvent, id: ToolId) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
         return;
      }

      event.preventDefault();
      this.navigateToTool(id, true);
   }

   protected onToolKeydown(event: KeyboardEvent, index: number) {
      let next = index;

      switch (event.key) {
         case 'ArrowDown':
            next = (index + 1) % this.tools.length;
            break;

         case 'ArrowUp':
            next = (index - 1 + this.tools.length) % this.tools.length;
            break;

         case 'Home':
            next = 0;
            break;

         case 'End':
            next = this.tools.length - 1;
            break;

         case ' ':
            break;

         default:
            return;
      }

      event.preventDefault();
      this.navigateToTool(this.tools[next].id, event.key === ' ');
   }

   protected openDrawer() {
      if (!this.isCompact() || this.drawerOpen()) return;

      this.closeFocus = 'trigger';
      this.drawer().nativeElement.showModal();
      this.drawerOpen.set(true);

      this.focusTool(this.activeTool());
   }

   protected dismissDrawer(destination: 'trigger' | 'workspace' = 'trigger') {
      if (!this.drawerOpen()) return;

      this.closeFocus = destination;
      this.drawer().nativeElement.close();
      this.drawerOpen.set(false);
   }

   protected onDrawerClosed() {
      this.drawerOpen.set(false);

      const target =
         this.closeFocus === 'workspace' || !this.isCompact()
            ? this.workspace()
            : this.navigationTrigger();

      target.nativeElement.focus({ preventScroll: true });
      this.closeFocus = 'trigger';
   }

   protected onBackdropClick(event: MouseEvent) {
      const drawer = this.drawer().nativeElement;
      const bounds = drawer.getBoundingClientRect();

      if (
         event.target === drawer &&
         (event.clientX < bounds.left || event.clientX > bounds.right)
      ) {
         this.dismissDrawer();
      }
   }

   private navigateToTool(id: ToolId, dismiss: boolean) {
      if (window.location.hash !== `#${id}`) {
         window.history.pushState(null, '', `#${id}`);
      }

      this.activeTool.set(id);

      if (!dismiss || !this.drawerOpen()) this.focusTool(id);
      if (dismiss && this.drawerOpen()) this.dismissDrawer('workspace');

      if (dismiss) {
         afterNextRender(
            {
               earlyRead: () => this.workspace().nativeElement.getBoundingClientRect().top < 0,
               write: (shouldScroll) => {
                  if (shouldScroll) {
                     this.workspace().nativeElement.scrollIntoView({
                        block: 'start',
                        behavior: 'instant',
                     });
                  }
               },
            },
            { injector: this.injector },
         );
      }
   }

   private focusTool(id: ToolId | null) {
      const index = this.tools.findIndex((tool) => tool.id === id);
      this.toolLinks()[index]?.nativeElement.focus({ preventScroll: true });
   }

   private updateLayout(compact: boolean, restoreFocus = false) {
      const focused = this.document.activeElement;
      const navigationHadFocus = this.navigation()?.nativeElement.contains(focused);
      const triggerHadFocus = focused === this.navigationTrigger().nativeElement;

      // CSS can hide the focused control before the media-query event arrives.
      const focusWasCleared = restoreFocus && focused === this.document.body;

      this.isCompact.set(compact);
      if (!compact && this.drawerOpen()) this.dismissDrawer('workspace');

      if (navigationHadFocus || triggerHadFocus || focusWasCleared) {
         afterNextRender(
            {
               write: () => {
                  const target = this.isCompact() ? this.navigationTrigger() : this.workspace();
                  target.nativeElement.focus({ preventScroll: true });
               },
            },
            { injector: this.injector },
         );
      }
   }
}
