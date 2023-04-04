import { Funko_type } from './types';
import { Funko_genre } from './types';

/**
 * @class Funko
 * @description Clase que representa un Funko
 */
export class Funko  {
  public readonly _id: number;
  public readonly _name: string;
  private _description: string;
  private _type: Funko_type;
  private _genre: Funko_genre;
  private _franchise: string;
  private _franchise_number: number;
  private _exclusive : boolean;
  private _especialCaracteristics: string;
  private _price: number;

  // constructor

  /**
   * Constructor de la clase Funko
   * @param id -- Id del Funko
   * @param name -- Nombre del Funko
   * @param description -- Descripcion del Funko
   * @param type -- Tipo del Funko
   * @param genre -- Genero del Funko
   * @param franchise -- Franquicia del Funko
   * @param franchise_number -- Numero de la franquicia
   * @param exclusive -- Exclusividad del Funko
   * @param especialCaracteristics -- Caracteristicas especiales del Funko
   * @param price -- Precio del Funko
   */
  constructor(id: number, name: string, description: string, type: Funko_type, genre: Funko_genre, franchise: string, franchise_number: number, exclusive: boolean, especialCaracteristics: string, price: number) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._type = type;
    this._genre = genre;
    this._franchise = franchise;
    this._franchise_number = franchise_number;
    this._exclusive = exclusive;
    this._especialCaracteristics = especialCaracteristics;
    this._price = price;
  }

  //* GET FUNKO DATA FOR JSON FILE *//

  /**
   * Método publico que devuelve los datos del Funko en un formato JSON
   * @returns 
   */
  public getFunkoData(){
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      type: this._type,
      genre: this._genre,
      franchise: this._franchise,
      franchise_number: this._franchise_number,
      exclusive: this._exclusive,
      especialCaracteristics: this._especialCaracteristics,
      price: this._price
    }
  }
}