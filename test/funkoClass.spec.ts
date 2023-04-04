import 'mocha'
import { expect } from 'chai'
import { Funko } from '../src/Funko/funkoClass'
import { Funko_type } from '../src/Funko/types'
import { Funko_genre } from '../src/Funko/types'

describe('Test Funko:', () => {
  const pop = "Pop!" as Funko_type;
  const anime = "Anime" as Funko_genre;
  const Jonh_nieve = new Funko(1, "Jonh_Nieve", "Jhon nieve de la casa Stark",pop, anime, "GoT",2, false, "BRILLA",120);
  const Black_panther = new Funko(2, "Black_panther", "Black panther de Wakanda",pop, anime, "Marvel",1, true, "Mueve la cabeza",25);
  const Tommy_Shelby = new Funko(3, "Tommy_Shelby", "Tommy Shelby de la familia Shelby",pop, anime, "Peaky Blinders",1, false, "UNICO",250);
  it('Primer test del metodo getFunkoData', () => {
    expect(Jonh_nieve.getFunkoData()).to.be.deep.equal({"id":1,"name":"Jonh_Nieve","description":"Jhon nieve de la casa Stark","type":"Pop!","genre":"Anime","franchise":"GoT","franchise_number":2,"exclusive":false,"especialCaracteristics":"BRILLA","price":120});
  })
  it ('Segundo test del metodo getFunkoData', () => {
    expect(Black_panther.getFunkoData()).to.be.deep.equal({"id":2,"name":"Black_panther","description":"Black panther de Wakanda","type":"Pop!","genre":"Anime","franchise":"Marvel","franchise_number":1,"exclusive":true,"especialCaracteristics":"Mueve la cabeza","price":25});
  })
  it ('Tercer test del metodo getFunkoData', () => {
    expect(Tommy_Shelby.getFunkoData()).to.be.deep.equal({"id":3,"name":"Tommy_Shelby","description":"Tommy Shelby de la familia Shelby","type":"Pop!","genre":"Anime","franchise":"Peaky Blinders","franchise_number":1,"exclusive":false,"especialCaracteristics":"UNICO","price":250});
  })
})