import { round } from 'bsmap';

export interface EbpmResults {
   bpm: number;
   beatPrecision: number;
   timeDistanceBeats: number;
   timeDistanceMs: number;
   effectiveBpm: number;
   streamBpm: number;
}

/** Calculates unrounded timing values. Validate the results before displaying them. */
export function calculateEbpmResults(bpm: number, beatPrecision: number): EbpmResults {
   const timeDistanceBeats = 1 / beatPrecision;
   const effectiveBpm = (bpm * beatPrecision) / 2;

   return {
      bpm,
      beatPrecision,
      timeDistanceBeats,
      timeDistanceMs: (60000 / bpm) * timeDistanceBeats,
      effectiveBpm,
      streamBpm: effectiveBpm / 2,
   };
}

/** Checks both the raw values and their display rounding for numeric overflow. */
export function areEbpmResultsValid(results: EbpmResults): boolean {
   const positiveValues = [
      results.bpm,
      results.beatPrecision,
      results.timeDistanceBeats,
      results.timeDistanceMs,
      results.effectiveBpm,
   ];

   const displayValues = [
      results.bpm,
      round(results.beatPrecision, 3),
      round(results.timeDistanceBeats, 3),
      round(results.timeDistanceMs, 3),
      round(results.effectiveBpm, 3),
      round(results.streamBpm, 3),
   ];

   return (
      positiveValues.every((value) => Number.isFinite(value) && value > 0) &&
      displayValues.every(Number.isFinite)
   );
}
