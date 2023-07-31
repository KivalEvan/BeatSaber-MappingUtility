import { BombNote } from '../../beatmap/v3/bombNote';
import { Chain } from '../../beatmap/v3/chain';
import { ColorNote } from '../../beatmap/v3/colorNote';
import { Obstacle } from '../../beatmap/v3/obstacle';
import { Difficulty } from '../../beatmap/v3/difficulty';
import { IBombNote } from '../../types/beatmap/v3/bombNote';
import { IChain } from '../../types/beatmap/v3/chain';
import { IColorNote } from '../../types/beatmap/v3/colorNote';
import { IObstacle } from '../../types/beatmap/v3/obstacle';
import { IDifficulty } from '../../types/beatmap/v3/difficulty';

export class NoodleDifficulty {
   fakeColorNotes: ColorNote[];
   fakeBombNotes: BombNote[];
   fakeObstacles: Obstacle[];
   fakeChains: Chain[];
   readonly base;

   constructor(base: Difficulty) {
      this.base = base;
      this.fakeColorNotes = [];
      this.fakeBombNotes = [];
      this.fakeObstacles = [];
      this.fakeChains = [];
      if (base.customData.fakeColorNotes) {
         this.addFakeColorNotes(...base.customData.fakeColorNotes);
      }
      if (base.customData.fakeBombNotes) {
         this.addFakeBombNotes(...base.customData.fakeBombNotes);
      }
      if (base.customData.fakeChains) {
         this.addFakeChains(...base.customData.fakeChains);
      }
      if (base.customData.fakeObstacles) {
         this.addFakeObstacles(...base.customData.fakeObstacles);
      }
   }

   toJSON(): IDifficulty {
      this.base.customData.fakeColorNotes = this.fakeColorNotes.map((n) => n.toJSON());
      this.base.customData.fakeBombNotes = this.fakeBombNotes.map((b) => b.toJSON());
      this.base.customData.fakeChains = this.fakeChains.map((bs) => bs.toJSON());
      this.base.customData.fakeObstacles = this.fakeObstacles.map((o) => o.toJSON());
      return this.base.toJSON();
   }

   addFakeColorNotes = (...colorNotes: Partial<IColorNote>[]) => {
      colorNotes.forEach((obj) => {
         this.fakeColorNotes.push(new ColorNote(obj));
      });
   };
   addFakeBombNotes = (...bombNotes: Partial<IBombNote>[]) => {
      bombNotes.forEach((obj) => {
         this.fakeBombNotes.push(new BombNote(obj));
      });
   };
   addFakeObstacles = (...obstacles: Partial<IObstacle>[]) => {
      obstacles.forEach((obj) => {
         this.fakeObstacles.push(new Obstacle(obj));
      });
   };
   addFakeChains = (...chains: Partial<IChain>[]) => {
      chains.forEach((obj) => {
         this.fakeChains.push(new Chain(obj));
      });
   };
}
