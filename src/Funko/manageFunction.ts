import * as fs from "fs";

import * as chalk from "chalk";

import { Funko } from "./funkoClass";

import { Funko_type } from "./types";
import { Funko_genre } from "./types";

import { exit } from 'process';

import {getMerchantValue} from './utilities';
import {getIds} from './utilities';


/**
 * @description Funcion que crea un nuevo directorio con el nombre del usuario
 * @param userName -- Nombre del usuario
 * @param path -- Path donde se va a crear el directorio
 */
export function createNewUser(userName: string, path: string) : void {
  fs.mkdirSync(`${path}/${userName}`);
}

/**
 * @description Funcion que crea un nuevo funko
 * @param path -- Path donde se va a crear el funko
 * @param user -- Usuario que crea el funko
 * @param id -- Id del funko
 * @param name -- Nombre del funko
 * @param des -- Descripcion del funko
 * @param type -- Tipo del funko
 * @param genre -- Genero del funko
 * @param franchise -- Franchise del funko
 * @param franchiseNum -- Numero de la franchise
 * @param exclusive -- Si es exclusivo o no
 * @param esCharacterist -- Caracteristicas especiales
 * @param price -- Precio del funko
 */
export function createNewFunko(path: string, user:string, id: number, name:string, des: string, type: string, genre: string, franchise: string, franchiseNum: number, exclusive: boolean, esCharacterist: string, price:number): void {
  const newPath = `${path}/${user}`;
  // Primero comprobamos si hay ids repetidos en el fichero
  const ids = getIds(newPath);
  if (ids.includes(id)) {
    console.log(chalk.black.bgRed.bold(`Ya se encuentra un funko con el id ${id} y nombre ${name} en su base de datos`));
    exit(0);
  } else {
    const typee = type as Funko_type;
    // console.log(typee);
    const genree = genre as Funko_genre;
    // console.log(genree);
    const funkopop = new Funko(id, name, des, typee, genree, franchise, franchiseNum, exclusive, esCharacterist, price);
    createJsonFunkoFile(newPath, funkopop);
  }
}

/**
 * @description Función que genera un fichero JSON con la información del funko
 * @param funko 
 */
function createJsonFunkoFile(path: string, funko: Funko): void {
  const writeData = funko.getFunkoData();
  const datosJSON = JSON.stringify(writeData);
  // creamos el path donde se va a crear el fichero con el nombre del funko y extension .json
  const newPath = `${path}/${funko._name}.json`; 

  fs.writeFileSync(newPath, datosJSON);
}

/**
 * Función que lista los funkos de un usuario
 * @param path -- Path donde se va a crear el funko
 * @param user -- Usuario que crea el funko
 */
export function listFunko(path: string, user: string): void {
  const newPath = `${path}/${user}`;
  const files = fs.readdirSync(newPath).filter((file) => file.endsWith('.json'));

  files.forEach((file) => {
    const data = fs.readFileSync(`${newPath}/${file}`, 'utf-8');
    const jsonData = JSON.parse(data);
    printJson(jsonData);
  });
}

/**
 * @description Función que busca un funko por su id
 * @param path -- Path donde se va a crear el funko
 * @param user -- Usuario que crea el funko
 * @param id -- Id del funko
 */
export function findFunkoByID(path: string, user: string, id: number): void {
  const newPath = `${path}/${user}`;
  const ids = getIds(newPath);
  if(ids.includes(id)) {
    const files = fs.readdirSync(newPath).filter((file) => file.endsWith('.json'));
    files.forEach((file) => {
      const data = fs.readFileSync(`${newPath}/${file}`, 'utf-8');
      const jsonData = JSON.parse(data);

      if (jsonData.id === id) {
        printJson(jsonData);
      }
    });
  } else {
    console.log(chalk.red.bold('No se ha encontrado el funko de id ' + id + ' en la coleccion de ' + user));
  }
}

/**
 * @description Función que muestra por pantalla el contenido de un fichero json
 * @param path -- Path del fichero json
 */
export function printJson(jsonData: any): void{
  console.log(chalk.white.bold('--------------------------------'));
  for (const key in jsonData) {
    if (key === 'price') {
      if (getMerchantValue(jsonData[key]) === 'Low') {
        console.log(chalk.red.bold(key) + chalk.bgRed.white(jsonData[key]));
        continue;
      } else if (getMerchantValue(jsonData[key]) === 'Medium') {
        console.log(chalk.red.bold(key) + chalk.bgYellow.white(jsonData[key]));
        continue;
      } else if (getMerchantValue(jsonData[key]) === 'High') {
        console.log(chalk.red.bold(key) + chalk.bgCyan.white(jsonData[key]));
        continue;
      } else {
        console.log(chalk.red.bold(key) + chalk.bgGreen.white(jsonData[key]));
        continue;
      }
    }
    console.log(chalk.red.bold(key) + chalk.white(jsonData[key]));
  }
  console.log(chalk.white.bold('--------------------------------'));
}

/**
 * @description Función que borra un funko por su id
 * @param path -- Path donde se va a crear el funko
 * @param user -- Usuario que crea el funko
 * @param id -- Id del funko
 * 
 */
export function removeFunko(path: string, user: string, id: number): void{
  const newPath = `${path}/${user}`;
  const ids = getIds(newPath);

  if (ids.includes(id)) {
    const files = fs.readdirSync(newPath).filter((file) => file.endsWith('.json'));
    files.forEach((file) => {
      const data = fs.readFileSync(`${newPath}/${file}`, 'utf-8');
      const jsonData = JSON.parse(data);

      if (jsonData.id === id) {
        const newpath_and_file = `${newPath}/${file}`;
        fs.unlinkSync(newpath_and_file);
      }
    });
  } else {
    console.log(chalk.red.bold('No se ha encontrado el funko de id ' + id + ' en la coleccion de ' + user));
    exit(0);
  }
}