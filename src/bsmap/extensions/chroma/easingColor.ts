import { ApplyEasingsOptions } from './types/colors';
import { BasicEvent } from '../../beatmap/v3/basicEvent';
import { IChromaEventLight } from '../../types/beatmap/v3/custom/chroma';

export function applyEasingsTransition(events: BasicEvent[], options: ApplyEasingsOptions) {
   let filteredEvents = events.filter((ev) => ev.isLightEvent() && ev.isOn());
   if (typeof options.type === 'number') {
      filteredEvents = filteredEvents.filter((ev) => ev.type === options.type);
   }
   filteredEvents.forEach((ev) => {
      (ev.customData as IChromaEventLight).easing = options.easing;
   });
}
