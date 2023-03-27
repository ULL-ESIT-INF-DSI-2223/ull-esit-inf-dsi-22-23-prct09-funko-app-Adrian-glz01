/**
 * Clase MapReduceAlgorithm que implementa el algoritmo Map y reduce basado en el patron de diseño Template Method
 */
export abstract class MapReduceAlgorithm {
  /**
   * Método run que ejecuta el algoritmo MapReduce con los parámetros dados
   * @param numbers -- array de números
   * @param mapFunction -- función de mapeo
   * @returns 
   */
  run(numbers: number[], mapFunction: (n: number) => number): number {
    const mappedNumbers = this.Mymap(numbers, mapFunction);
    const reducedNumber = this.REDUCE(mappedNumbers);
    //HOOK 
    this.printResult(reducedNumber);
    return reducedNumber;
  }

  /**
   * Método Mymap que implementa el algoritmo Map 
   * RESCATADO DE LA PRACTICA 4 DE LA ASIGNATURA EJERCICIO 4.
   * @param array -- array de números
   */
  protected Mymap(array: number[], myFunction: (item:number ) => number): number[] {
    const result: number[] = [];
    array.forEach(function (value) {
      result.push(myFunction(value));
    });
    return result;
  }

  /**
   * Meotodo abstracto REDUCE que implementa el algoritmo Reduce
   * @param numbers -- array de números
   */
  protected abstract REDUCE(numbers: number[]): number;

  //*HOOKS 

  /**
   * Método que imprime el resultado del algoritmo MapReduce
   * @param result -- resultado del algoritmo MapReduce
   */
  protected printResult(result: number): string {
    const mynumstring = result.toString();
    return mynumstring;
    //console.log(result);
  }
}