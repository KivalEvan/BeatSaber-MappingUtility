import { NoteJumpSpeed, round } from 'bsmap';

interface PatternTiming {
   timeDistance: number;
   beatPrecision: number;
}

interface JumpPatterns {
   reverseStaircase: PatternTiming;
   diagonalReverseStaircase: PatternTiming;
   inlineHitbox: PatternTiming;
}

export interface JumpResults {
   hjd: number;
   jd: number;
   minJd: number;
   minReactionTimeMs: number;
   optimalJdLow: number;
   optimalJdHigh: number;
   reactionTimeMs: number;
   patterns: JumpPatterns;
}

/** Calculates display-ready jump timing, or null for invalid inputs or out-of-range results. */
export function calculateJumpResults(njs: NoteJumpSpeed): JumpResults | null {
   if (
      !Number.isFinite(njs.bpm) ||
      njs.bpm <= 0 ||
      !Number.isFinite(njs.value) ||
      njs.value <= 0 ||
      !Number.isFinite(njs.offset)
   ) {
      return null;
   }

   const [optimalJdLow, optimalJdHigh] = njs.calcJdOptimal();
   const reverseStaircaseTime = (1.425 / njs.value - 0.0216882353) * (njs.bpm / 60);
   const diagonalReverseStaircaseTime = (1.425 / njs.value - 0.03414823529) * (njs.bpm / 60);
   const inlineHitboxTime = (1.425 / njs.value) * (njs.bpm / 60);
   const hjd = njs.hjd;
   const jd = njs.calcJd(hjd);
   const minJd = njs.calcJd(NoteJumpSpeed.HJD_MIN);
   const minReactionTimeMs = njs.calcRtFromHjd(NoteJumpSpeed.HJD_MIN) * 1000;
   const reactionTimeMs = njs.calcRtFromHjd(hjd) * 1000;

   const rawValues = [
      hjd,
      jd,
      minJd,
      minReactionTimeMs,
      optimalJdLow,
      optimalJdHigh,
      reactionTimeMs,
      reverseStaircaseTime,
      diagonalReverseStaircaseTime,
      inlineHitboxTime,
      1 / reverseStaircaseTime,
      1 / diagonalReverseStaircaseTime,
      1 / inlineHitboxTime,
   ];

   if (!rawValues.every(Number.isFinite)) return null;

   const result: JumpResults = {
      hjd: round(hjd, 3),
      jd: round(jd, 3),
      minJd: round(minJd, 3),
      minReactionTimeMs: round(minReactionTimeMs),
      optimalJdLow: round(optimalJdLow, 3),
      optimalJdHigh: round(optimalJdHigh, 3),
      reactionTimeMs: round(reactionTimeMs),
      patterns: {
         reverseStaircase: {
            timeDistance: round(reverseStaircaseTime, 3),
            beatPrecision: round(1 / reverseStaircaseTime, 1),
         },
         diagonalReverseStaircase: {
            timeDistance: round(diagonalReverseStaircaseTime, 3),
            beatPrecision: round(1 / diagonalReverseStaircaseTime, 1),
         },
         inlineHitbox: {
            timeDistance: round(inlineHitboxTime, 3),
            beatPrecision: round(1 / inlineHitboxTime, 1),
         },
      },
   };

   const roundedValues = [
      result.hjd,
      result.jd,
      result.minJd,
      result.minReactionTimeMs,
      result.optimalJdLow,
      result.optimalJdHigh,
      result.reactionTimeMs,
      ...Object.values(result.patterns).flatMap(({ timeDistance, beatPrecision }) => [
         timeDistance,
         beatPrecision,
      ]),
   ];

   return roundedValues.every(Number.isFinite) ? result : null;
}
