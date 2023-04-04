import 'mocha'
import { expect } from 'chai'

import {checkUserDirSync} from '../src/Funko/utilities'
import {getIds} from '../src/Funko/utilities'
import {getMerchantValue} from '../src/Funko/utilities'


describe('Test del fichero Utilities.ts:', () => {
  it ('Primer test del metodo checkUserDirSync', () => {
    expect(checkUserDirSync('Adrian', './database')).to.be.equal(true);
  })
  it ('Segundo test del metodo checkUserDirSync', () => {
    expect(checkUserDirSync('Amanda', './database')).to.be.equal(false);
  })
  it ('Primer test del metodo getIds', () => {
    expect(getIds('./database/Adrian')).to.be.deep.equal([4,1,2]);
  })
  it ('Segundo test del metodo getIds', () => {
    expect(getIds('./database/Eva')).to.be.deep.equal([1,2]);
  })
  it ('Primer test del metodo getMerchantValue', () => {
    expect(getMerchantValue(5)).to.be.equal('Low');
  })
  it ('Segundo test del metodo getMerchantValue', () => {
    expect(getMerchantValue(15)).to.be.equal('Medium');
  })
  it ('Tercer test del metodo getMerchantValue', () => {
    expect(getMerchantValue(30)).to.be.equal('High');
  })
  it ('Cuarto test del metodo getMerchantValue', () => {
    expect(getMerchantValue(60)).to.be.equal('Very High');
  })
})