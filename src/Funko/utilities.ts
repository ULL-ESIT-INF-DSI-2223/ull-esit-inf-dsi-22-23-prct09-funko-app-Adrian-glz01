import * as fs from "fs";

/**
 * @Description Funcion que verifica si existe un directorio con el nombre del usuario en la base de datos
 * @param userNAme -- Nombre del usuario
 * @param path -- Path donde se va a buscar el directorio
 */
export function checkUserDirSync(userName: string, path: string) : boolean {
  // Leemos el directorio y almacenamos en una variable los archivos dentro de ella
  //? Tener en cuenta que pueden ser carpetas o archivos, para no olvidarme de manejar esto despues... 
  const pathDirectories = fs.readdirSync(path); 

  // variable booleana para retornar si existe o no el directorio
  //? lstatSync Mediante esta funcion podemos saber si es un directorio o un archivo, en caso de ser un archivo se retornara false
  const existDir = pathDirectories.some((dir) => dir === userName && fs.lstatSync(`${path}/${dir}`).isDirectory()) 

  return existDir;
}

/**
 * @description Función que comprueba si el id del funko es unico
 * @param path -- Path donde se va a crear el funko
 */
export function getIds(path:string): number[] {
  const files = fs.readdirSync(path).filter((file) => file.endsWith('.json')); // nos aseguramos que los ficheros leidos son solo los .json, para curarme en salud
  const ids: number[] = []; // array donde almacenaremos los ids de los funkos del usuario

  files.forEach((file) => {
    const content = fs.readFileSync(`${path}/${file}`);
    const funkoData = JSON.parse(content.toString());
    // console.log(funkoData.id);
    ids.push(funkoData.id);
  });

  // console.log(ids);
  return ids;
}

/**
 * @description Función que devuelve el valor de mercado del funko
 * @param price -- Precio del funko
 * @returns -- Valor de mercado del funko
 */
export function getMerchantValue(price: number): string {
  if (price < 10) {
    return "Low";
  } else if (price >= 10 && price < 20) {
    return "Medium";
  } else if (price >= 20 && price < 50) {
    return "High";
  }
  return "Very High";
}