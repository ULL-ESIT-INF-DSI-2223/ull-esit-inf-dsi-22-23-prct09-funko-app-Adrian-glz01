import 'mocha'
import { expect } from 'chai'
import { ProdMapReduce } from '../src/pe102/multMapReduce'

describe ('Test prod map reduce:', () => {
  it ('Primer test', () => {
    const numbers = [1,2,3,4,5];
    const prodMapReduce = new ProdMapReduce();
    expect(prodMapReduce.run(numbers, n => n)).to.equal(120);
  });
  it ('Segundo test', () => {
    const numbers = [10,20,30];
    const prodMapReduce = new ProdMapReduce();
    expect(prodMapReduce.run(numbers, n => n)).to.equal(6000);
  });
});