import 'mocha'
import { expect } from 'chai'
import { SubMapReduce } from '../src/pe102/subMapReduce'

describe('Test add map reduce:', () => {
  it('Primer test', () => {
    const numbers = [1, 2, 3, 4, 5]
    const subMapReduce = new SubMapReduce();
    expect(subMapReduce.run(numbers, n => n)).to.equal(-15)
  });
  it ('Segundo test', () => {
    const numbers = [10,20,30];
    const subMapReduce = new SubMapReduce();
    expect(subMapReduce.run(numbers, n => n)).to.equal(-60);
  });
});