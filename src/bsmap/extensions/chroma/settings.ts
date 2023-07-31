import { BeatPerMinute } from '../../beatmap/shared/bpm';
import { ColorType } from '../../types/colors';

export const settings: {
   BPM: BeatPerMinute | null;
   colorType: ColorType | null;
} = {
   BPM: null,
   colorType: null,
};
