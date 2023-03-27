import { MapReduceAlgorithm } from "./mapReduceClass";

/**
 * Clases que heredan de MapReduceAlgorithm y que implementan el método reduce para realizar la multiplicación de los elementos
 * @param numbers -- array de números
 * @returns -- resultado de la multiplicación de los elementos
 */
export class ProdMapReduce extends MapReduceAlgorithm {
protected REDUCE(numbers: number[]): number {
  // console.log(numbers)
  let acc = 1;
  for (let i = 0; i < numbers.length; i++) {
  acc *= numbers[i];
  }
  return acc;
}
}