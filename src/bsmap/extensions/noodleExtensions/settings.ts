import { BeatPerMinute } from '../../beatmap/shared/bpm';
import { NoteJumpSpeed } from '../../beatmap/shared/njs';

export const settings: {
   BPM: BeatPerMinute | null;
   NJS: NoteJumpSpeed | null;
} = {
   BPM: null,
   NJS: null,
};
