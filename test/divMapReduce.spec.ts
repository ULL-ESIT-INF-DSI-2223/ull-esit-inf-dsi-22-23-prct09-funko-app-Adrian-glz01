import 'mocha'
import { expect } from 'chai'
import { DivMapReduce } from '../src/pe102/divMapReduce'

describe('Test div map reduce:', () => {
  it('Primer test', () => {
    // usar para al division el toBeCloseTo
    const numbers = [1, 2, 3, 4, 5]
    const divMapReduce = new DivMapReduce();
    expect(divMapReduce.run(numbers, n => n)).to.be.closeTo(0.008333333333333333, 0.0000000000000001)
  });
});