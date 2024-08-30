import type { Vector2 } from 'bsmap/types';

export const ppCurve: { [key: string]: Vector2[] } = {
   'ScoreSaber 2023': [
      [0.0, 0.0],
      [0.6, 0.18223233667439062],
      [0.65, 0.5866010012767576],
      [0.7, 0.6125565959114954],
      [0.75, 0.6451808210101443],
      [0.8, 0.6872268862950283],
      [0.825, 0.7150465663454271],
      [0.85, 0.7462290664143185],
      [0.875, 0.7816934560296046],
      [0.9, 0.825756123560842],
      [0.91, 0.8488375988124467],
      [0.92, 0.8728710341448851],
      [0.93, 0.9039994071865736],
      [0.94, 0.9417362980580238],
      [0.95, 1.0],
      [0.955, 1.0388633331418984],
      [0.96, 1.0871883573850478],
      [0.965, 1.1552120359501035],
      [0.97, 1.2485807759957321],
      [0.9725, 1.3090333065057616],
      [0.975, 1.3807102743105126],
      [0.9775, 1.4664726399289512],
      [0.98, 1.5702410055532239],
      [0.9825, 1.697536248647543],
      [0.985, 1.8563887693647105],
      [0.9875, 2.058947159052738],
      [0.99, 2.324506282149922],
      [0.99125, 2.4902905794106913],
      [0.9925, 2.685667856592722],
      [0.99375, 2.9190155639254955],
      [0.995, 3.2022017597337955],
      [0.99625, 3.5526145337555373],
      [0.9975, 3.996793606763322],
      [0.99825, 4.325027383589547],
      [0.999, 4.715470646416203],
      [0.9995, 5.019543595874787],
      [1.0, 5.367394282890631],
   ],
   'ScoreSaber 2022': [
      [1, 7],
      [0.999, 6.24],
      [0.9975, 5.31],
      [0.995, 4.14],
      [0.9925, 3.31],
      [0.99, 2.73],
      [0.9875, 2.31],
      [0.985, 2.0],
      [0.9825, 1.775],
      [0.98, 1.625],
      [0.9775, 1.515],
      [0.975, 1.43],
      [0.9725, 1.36],
      [0.97, 1.3],
      [0.965, 1.195],
      [0.96, 1.115],
      [0.955, 1.05],
      [0.95, 1],
      [0.94, 0.94],
      [0.93, 0.885],
      [0.92, 0.835],
      [0.91, 0.79],
      [0.9, 0.75],
      [0.875, 0.655],
      [0.85, 0.57],
      [0.825, 0.51],
      [0.8, 0.47],
      [0.75, 0.4],
      [0.7, 0.34],
      [0.65, 0.29],
      [0.6, 0.25],
      [0.0, 0.0],
   ],
   'ScoreSaber 2020': [
      [1, 1.5],
      [0.99, 1.39],
      [0.98, 1.29],
      [0.97, 1.2],
      [0.96, 1.115],
      [0.95, 1.046],
      [0.945, 1.015],
      [0.9, 0.75],
      [0.8, 0.5],
      [0.7, 0.285],
      [0.68, 0.24],
      [0.65, 0.16],
      [0.6, 0.105],
      [0.55, 0.06],
      [0.5, 0.03],
      [0.45, 0.015],
      [0, 0],
   ],
   'ScoreSaber 2018': [
      [1.14, 1.2],
      [1.1, 1.15],
      [1, 1.1],
      [0.95, 1.036],
      [0.94, 0.974],
      [0.93, 0.92],
      [0.92, 0.885],
      [0.91, 0.85],
      [0.9, 0.815],
      [0.88, 0.766],
      [0.86, 0.72],
      [0.845, 0.63],
      [0.82, 0.56],
      [0.75, 0.425],
      [0.69, 0.25],
      [0.5, 0.15],
      [0.4, 0.08],
      [0, 0],
   ],
   Custom: [],
};

Object.values(ppCurve).forEach((curves) => curves.sort((a, b) => b[0] - a[0]));
