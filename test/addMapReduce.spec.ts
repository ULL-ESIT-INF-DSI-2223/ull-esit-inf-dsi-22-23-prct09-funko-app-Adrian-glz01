import 'mocha'
import { expect } from 'chai'
import { AddMapReduce } from '../src/pe102/addMapReduce'

describe('Test add map reduce:', () => {
  it('Primer test', () => {
    const numbers = [1, 2, 3, 4, 5]
    const addMapReduce = new AddMapReduce();
    expect(addMapReduce.run(numbers, n => n)).to.equal(15)
  });
  it ('Segundo test', () => {
    const numbers = [10,20,30];
    const addMapReduce = new AddMapReduce();
    expect(addMapReduce.run(numbers, n => n)).to.equal(60);
  });
});