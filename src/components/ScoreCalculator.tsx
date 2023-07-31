import { createStore } from 'solid-js/store';
import type { Vector2 } from '../bsmap/types/vector';
import { formatNumber, invLerp, lerp, round } from '../bsmap/utils/math';
import { ppCurve } from '../data/ppCurve';
import { For, Index, createSignal } from 'solid-js';

function interpolatePoint(pointArr: Vector2[], xPoint: number): number {
   const percAry = pointArr.map((arr) => arr[0]);
   const multAry = pointArr.map((arr) => arr[1]);
   const pS = percAry.find((x) => x <= xPoint) ?? percAry[0];
   const pE = [...percAry].reverse().find((x) => x >= xPoint) ?? pS;
   const mS = multAry[percAry.indexOf(pS)];
   const mE = multAry[percAry.indexOf(pE)];
   const t = invLerp(xPoint, pS, pE) || 0;
   return multAry[percAry.indexOf(xPoint)] || lerp(t, mS, mE);
}

const maxNoteScore: number = 115;

const scoreModifier: {
   [key: string]: { [key: string]: number | string };
} = {
   nf: {
      name: 'No Fail',
      value: -0.5,
   },
   no: {
      name: 'No Obstacles',
      value: -0.05,
   },
   nb: {
      name: 'No Bombs',
      value: -0.1,
   },
   ss: {
      name: 'Slower Song',
      value: -0.3,
   },
   da: {
      name: 'Disappearing Arrows',
      value: 0.07,
   },
   fs: {
      name: 'Faster Song',
      value: 0.08,
   },
   gn: {
      name: 'Ghost Notes',
      value: 0.11,
   },
};

const [score, setScore] = createStore({
   note: 727,
   rating: 7,
   percent: 0.9,
   score: 0,
   pp: 0,
   ppStar: 1 / 1.046 / 0.0227,
   avgCut: 111,
   missed: [3, 22, 100, 102],
   break: [127],
   curveSelect: 'ScoreSaber 2022',
   curve: ppCurve['ScoreSaber 2022'],
   tablePercent: [100, 99.5, 99, 98, 97, 96, 95, 94, 93, 90, 85, 80],

   maxScore: 0,
   maxScoreMod: 0,
   estPercent: 0,
   estScore: 0,
   estPP: 0,
   missScore: 0,
   noMissPercent: 0,
   noMissScore: 0,
   noMissPP: 0,
});
const [errMsg, setErrMsg] = createSignal('');

// 100% pp value
// 0.9458064516129032 interpolated value
// 0.9431707317073172 rabbit's interpolated value
function calcPP(rate: number = score.rating, perc: number = 0.9458064516129032): number {
   return score.ppStar * rate * interpolatePoint(score.curve.length ? score.curve : [[1, 1]], perc);
}

// miss simulate missing the note
// break simulate combo break due to wall or bomb, but it can only happen once before the note
// miss and break can happen at the same time, resulting multiplier to reduce twice
function calcScore(
   note: number = maxNoteScore,
   mult: number = 1,
   nMissed: number[] = [],
   nBreak: number[] = [],
): number {
   let total: number = 0;
   let noteScore: number = note * mult;
   let multFlag: boolean = true;
   let multCombo: number = 0;
   let multiplier: number = 1;
   const cMissed = [...nMissed].map((x) => x - 1);
   const cBreak = [...nBreak].map((x) => x - 1);
   function comboBreak() {
      multiplier = Math.max(multiplier / 2, 1);
      multCombo = 0;
      multFlag = true;
   }
   for (let i = 0; i < score.note; i++) {
      if (cBreak.includes(i)) {
         comboBreak();
      }
      if (cMissed.includes(i)) {
         comboBreak();
         continue;
      }
      multCombo++;
      if (multFlag && multCombo >= 2 * multiplier) {
         multiplier *= 2;
         if (multiplier >= 8) {
            multFlag = false;
         }
         multCombo = 0;
      }
      total += noteScore * multiplier;
   }
   return total;
}

updateScore();
updateScoreEst();

function noteHandler(this: HTMLInputElement, ev: Event) {
   setScore('note', this.valueAsNumber || 0);
   updateScore();
   updateScoreEst();
}
function ratingHandler(this: HTMLInputElement, ev: Event) {
   setScore('rating', round(this.valueAsNumber || 0, 2));
   updateScore();
   updateScoreEst();
}
function percentHandler(this: HTMLInputElement, ev: Event) {
   setScore('percent', round(this.valueAsNumber / 100 || 0, 4));
   updateScore();
}
function scoreHandler(this: HTMLInputElement, ev: Event) {
   setScore('score', this.valueAsNumber || 0);
   setScore('percent', round(score.score / calcScore(), 4));
   setScore('pp', round(calcPP(score.rating, score.percent), 2));
}
function avgCutHandler(this: HTMLInputElement, ev: Event) {
   setScore('avgCut', round(this.valueAsNumber, 2));
   updateScoreEst();
}
function missBreakHandler(this: HTMLInputElement) {
   const temp: string = this.value.trim().replace(/\s+,/, ',');
   if (/^((\d+\.)?\d+,?)+/.test(temp) || temp === '') {
      setScore(
         this.name as 'missed',
         temp
            .split(',')
            .map((x) => parseInt(x))
            .filter((x) => !isNaN(x))
            .sort((a: number, b: number) => a - b),
      );
      updateScoreEst();
   }
}
function tablePercentHandler(this: HTMLInputElement) {
   const temp: string = this.value.trim().replace(/\s+,/, ',');
   if (/^((\d+\.)?\d+,?)+/.test(temp)) {
      setScore(
         'tablePercent',
         temp
            .split(',')
            .map((x) => parseFloat(x))
            .filter((x) => !isNaN(x))
            .sort((a: number, b: number) => b - a),
      );
   }
}
function updateScore() {
   setScore('score', round(calcScore() * score.percent));
   setScore('pp', round(calcPP(score.rating, score.percent), 2));
   setScore('maxScore', calcScore());
   setScore('maxScoreMod', calcScore());
}
function updateScoreEst() {
   const maxScore = calcScore();
   const estScore = calcScore(score.avgCut, undefined, score.missed, score.break);
   const noMissScore = calcScore(score.avgCut);
   setScore('estPercent', round(estScore / maxScore, 4));
   setScore('estScore', round(estScore));
   setScore('estPP', round(calcPP(score.rating, estScore / maxScore), 2));
   setScore('missScore', round(noMissScore - estScore));
   setScore('noMissPercent', round(noMissScore / maxScore, 4));
   setScore('noMissScore', round(noMissScore));
   setScore('noMissPP', round(calcPP(score.rating, noMissScore / maxScore), 2));
}
function scoreCurveHandler(this: HTMLOptionElement) {
   setScore('curve', ppCurve[this.value]);
   updateScore();
   updateScoreEst();
}
function ppStarHandler(this: HTMLInputElement) {
   setScore('ppStar', this.valueAsNumber);
   updateScore();
   updateScoreEst();
}
function jsonScoreHandler(this: HTMLTextAreaElement) {
   let parsedJSON: { [key: string]: Vector2[] } = {};
   setErrMsg('');
   try {
      if (/^{/.test(this.value.trim())) {
         parsedJSON = JSON.parse(this.value.trim());
      } else {
         parsedJSON = JSON.parse(`{${this.value.trim().replace(/\,$/, '')}}`);
      }
      if (!Array.isArray(parsedJSON.curvePoints))
         throw new Error('"curvePoints" is not an array of Vector2');
      if (
         !parsedJSON.curvePoints.every((p) => {
            return Array.isArray(p) && p.length > 1 && p.every((e) => typeof e === 'number');
         })
      )
         throw new Error('Invalid element(s) in "curvePoints", not Vector2?');
      setScore('curve', parsedJSON.curvePoints);
      ppCurve['custom'] = parsedJSON.curvePoints;
   } catch (err) {
      console.error(err);
      setErrMsg(err instanceof Error ? err.message : 'Unhandled Exception');
   }
   updateScore();
   updateScoreEst();
}

export default function () {
   return (
      <div id="score-calculator">
         <h2>Score Calculator</h2>
         <div class="subpanel-medium">
            <input
               type="number"
               id="score-input-note"
               min="0"
               step="1"
               value={score.note}
               onInput={noteHandler}
            />
            <label for="score-input-note"> Notes</label>
            <br />
            <input
               type="number"
               id="score-input-star"
               min="0"
               step="0.1"
               value={score.rating}
               onInput={ratingHandler}
            />
            <label for="score-input-star"> Star Rating</label>
            <br />
            <input
               type="number"
               id="score-input-percent"
               min="0"
               max="100"
               step="0.1"
               value={round(score.percent * 100, 2)}
               onChange={percentHandler}
            />
            <label for="score-input-percent"> Percentage</label>
            <br />
            <input
               type="number"
               id="score-input-score"
               min="0"
               step="920"
               value={score.score}
               onChange={scoreHandler}
            />
            <label for="score-input-score"> Score</label>
            <br />
            <span>{formatNumber(round(score.pp, 2))} PP</span>
            <br />
            <br />
            <span>
               <b>Max Score: </b>
               {formatNumber(score.maxScore)}
            </span>
            <br />
            <span>
               <b>Max Score (Modifier): </b>
               {formatNumber(score.maxScoreMod)}
            </span>
            <br />
         </div>
         <div class="subpanel-medium">
            <label for="score-input-avgcut">
               <b>Avg. Cut: </b>
            </label>
            <input
               type="number"
               id="score-input-avgcut"
               min="0"
               step="1"
               value={score.avgCut}
               onChange={avgCutHandler}
            />
            <br />
            <label for="score-input-missed">
               <b>Missed: </b>
            </label>
            <textarea
               id="score-input-missed"
               name="missed"
               style="width:97%"
               value={score.missed.join(',')}
               onChange={missBreakHandler}
            />
            <br />
            <label for="score-input-break">
               <b>Break: </b>
            </label>
            <textarea
               id="score-input-break"
               name="break"
               style="width:97%"
               value={score.break.join(',')}
               onChange={missBreakHandler}
            />
            <br />
            <br />
            <span>
               <b>Est. Score: </b>
               {formatNumber(score.estScore)} ({score.estPercent * 100}%)
            </span>
            <br />
            <span>
               <b>Est. PP: </b>
               {formatNumber(score.estPP)}
            </span>
            <br />
            <span>
               <b>Missed Score: </b>
               {formatNumber(score.missScore)}
            </span>
            <br />
            <br />
            <span>
               <b>No Miss Score: </b>
               {formatNumber(score.noMissScore)} ({score.noMissPercent * 100}%)
            </span>
            <br />
            <span>
               <b>No Miss PP: </b>
               {formatNumber(score.noMissPP)}
            </span>
            <br />
         </div>
         <div class="subpanel-medium">
            <table id="score-table">
               <thead>
                  <tr>
                     <th>Percentage</th>
                     <th>Score</th>
                     <th>PP</th>
                  </tr>
               </thead>
               <tbody>
                  <For each={score.tablePercent}>
                     {(curve, i) => (
                        <tr>
                           <td>{curve}</td>
                           <td>{formatNumber(round((calcScore() * curve) / 100))}</td>
                           <td>{formatNumber(round(calcPP(score.rating, curve / 100), 2))}</td>
                        </tr>
                     )}
                  </For>
               </tbody>
            </table>
            <label for="score-table-percentage">
               <b>Table Percentage: </b>
            </label>
            <textarea
               id="score-table-percentage"
               style="width:97%"
               value={score.tablePercent.join(',')}
               onChange={tablePercentHandler}
            />
            <br />
         </div>
         <div class="subpanel-medium">
            <select
               id="score-option-pp-curve"
               value={score.curveSelect}
               onChange={scoreCurveHandler}
            >
               <Index each={Object.keys(ppCurve)}>
                  {(c) => <option value={c()}>{c()}</option>}
               </Index>
            </select>
            <label for="score-option-pp-curve"> PP Curve</label>
            <input
               type="number"
               id="score-input-pp-star"
               min="0"
               step="0.1"
               value={score.ppStar}
               onChange={ppStarHandler}
            />
            <label for="score-input-pp-star input-large"> PP Per Star</label>
            <br />
            <label for="score-text-json">
               <b>JSON format: </b>
            </label>
            <br />
            <textarea
               id="score-text-json"
               rows="16"
               style="width:97%"
               disabled={score.curveSelect === 'Custom'}
               value={JSON.stringify({ curvePoints: score.curve }, null, 2)}
               onChange={jsonScoreHandler}
            />
            <br />
            <span class="msg-error">{errMsg()}</span>
         </div>
      </div>
   );
}
