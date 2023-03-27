import { MapReduceAlgorithm } from "./mapReduceClass";

/**
 * Clases que heredan de MapReduceAlgorithm y que implementan el método reduce para realizar la resta de los elementos
 * @param numbers -- array de números
 * @returns -- resultado de la resta de los elementos
 */
export class SubMapReduce extends MapReduceAlgorithm {
protected REDUCE(numbers: number[]): number {
// console.log(numbers)
  let acc = 0;
  for (let i = 0; i < numbers.length; i++) {
  acc -= numbers[i];
  }
  return acc;
  }
}