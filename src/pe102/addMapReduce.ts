import { MapReduceAlgorithm } from "./mapReduceClass";

/**
 * Clases que heredan de MapReduceAlgorithm y que implementan el método reduce para realizar la suma de los elementos
 * @param numbers -- array de números
 * @returns -- resultado de la suma de los elementos
 */
export class AddMapReduce extends MapReduceAlgorithm {

protected REDUCE(numbers: number[]): number {
  // console.log(numbers)
  let acc = 0;
  for (let i = 0; i < numbers.length; i++) {
  acc += numbers[i];
  }
  return acc;
}
}  