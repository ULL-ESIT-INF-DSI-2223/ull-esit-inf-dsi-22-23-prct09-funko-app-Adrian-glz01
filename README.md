# Informe 

En está práctica pondremos en prácticas los conceptos aprendidos en las clases de teoría sobre las APIs síncronas de NODE.js.

Se ha pedido realizar una aplicación para almacenar listados de Funko Pops de una colección de usuarios. Contamos con un directorio 'database' en la raíz en el cual se encuentran alojados los directorios de cada usuario registrado en la aplicacion y dentro de cada uno de estos directorios se encuentra un conjunto de ficheros con extensión .json, y en estos se recogen los siguientes datos para cada funko:

  1. ID (ha de ser único)
  2. Nombre
  3. Descripcion
  4. Tipo
  5. Género
  6. Franquicia
  7. Número de franquicia
  8. Exclusividad
  9. Características especiales
  10. Precio

## __Índice__

1. [Aspectos a tener en cuenta](#1-aspectos-a-tener-en-cuenta)
2. [Solución propuesta](#2-solución-propuesta)
4. [Ejemplo de uso de la aplicación](#3ejemplo-de-uso-de-la-aplicación)
4. [Dificultades/Reflexión.](#4dificultadesreflexión)
5. [Referencias.](#5referencias)

## __1. Aspectos a tener en cuenta:__

  ### Compilación y ejecución 

  En caso de que se desee ejecutar la aplicación se facilitan a continuación los comandos necesarios para ello.

  ```console
  $npm run start 

  -- Utilice el atajo Ctrl+C para cancelar la compilación
  -- Utilice el atajo Ctrl+L para limpiar la terminal

  -- Alojado en el directorio raiz ejecute:
  $node ./dist/Funko/funko-app.js (con los parametros que crea correspondiente)
  ```

  En caso de desconocer alguno de los parametros que se requieren para el correcto uso de la aplicacion ejecute haga uso del __--help__ para obtener información sobre cada comando

  ### Coexistencia ESM y CommonJS

  Como se comentó en clase hay diversas incompatibilidades entre los módulos ESM y CommonJS. Para solventar cualquier este tipo de problemas opte por dejar todos los ficheros de configuración tal y como estaban en las entregas anteriores e instalar la _versión 4.1.2_ de chalk.

## __2. Solución propuesta__:

Se realizará la explicación de la aplicación con un orden cronoógico en función de como se fueron desarrollando los programas y las estructuras.

En primer lugar, se desarrolló la clase Funko en la cual se recogen todos los atributos de cada funko y un único método publico que devuelve un objeto en formato json con estos atributos.

He de mencionar que en la primera versión de esta clase habían más métodos, concretamente un getter y un setter para cada atributo. SIn embargo, no se estaban utilizando y además los _get_ y _set_ daban problemas de incompatibilidad con los módulos ESM. En particular los setters se obivaron por que la clase no se esta modificando una vez se crea y en cuanto a los getters como solamente se estaba accediendo al _id_ y al _nombre_ del funko para realizar comprobaciones tales como que no existan ids repetidos en la base de datos de un usuario se modifico el atributo para dejar de ser privado y ser _public readonly_.

Además, mencionar que en un primer momento se desarrollaron las clases _FunkoColecction_ donde se almacenaba una colección de funkos, así como la clase usuario donde en un principio estarían las funciones de manejo del usuario. Sin embargo se borraron ya que eran innecesarias al poder realizar todo mediante APIs sincronas de NODE.js.

En segundo lugar, se fueron desarrollando los comandos con los que interactuará el usuario para poder modificar y acceder a su base de datos con colecciones de funkos.

Antes de comenzar con los comandos, explicar que para cada uno de ellos hay un parametor obligatorio el cual es _--user_ el cual introduce que usuario se esta "conectando" y a que base de datos se esta accediendo, si este no es un usuario registrado, es decir, no esta creado en la base de datos, se crea su correspondiente directorio.

A continuación se adjuntan varias funciones que se utilizarán posteriormente para realizar tareas como; 

  - Comprobar si existe un directorio para el usuario que se pasa como parametro a las funciones
  - Devolver un array con los ids de la colección de un usuario
  - Obtener una string con el valor del mercado del funko

```ts
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
```

Ahora si, atendiendo a cada comando:

En primer lugar, el comando _add_ al cual se le pasan como parámetros obligatorios todos los atributos mencionados anteriormente en la clase funko y se crea dentro del usuario "conectado" un fichero con extensión .json con esa información. Obivamente comprobando en un primer momento si ya existe un funko con la id que se está introduciendo por parámetro (como se puede ver [aquí](#informe) el ID es único).

ADD -- Añadir un funko a la colección de un usuario

```ts
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
```

A continuación se creo el comando _remove_ al cual se le pasa como parametro un usuario y una id, primero se comprueba que el usuario existe, en caso de no ser así se emite un mensaje de error, tras esto se comprueba si el ID que se pasa corresponde a un funko de la colección del usuario, de no ser así se emitiría un error y si se han superado estos filtros se finaliza eliminando el funko pop de la colección del usuario:

REMOVE -- Elimina un funko pop de la colección de un usuario:

```ts
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
```

Tras este se desarrolló el comando _update_ bastante similar al anterior en cuanto a parametros que se le pasan, sin embargo si se le pasa un usuario no registrado en la BBDD se lanza un mensaje de error en lugar de crearlo. Este comando modifica el contenido de un funko pop por los nuevos datos que se pasan como parámetro realizando una búsqueda a partir del ID que se introduce.

La modificación se realiza mediante las funciones llamadas en los comandos anteriores, primero se borra el pop y se crea de nuevo con los datos modificados.

UPDATE -- Actualizar datos de un funko pop

```ts
yargs(hideBin(process.argv))
  .command('update', 'Modify funko content', {
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true, // obligatorio
    },
    id: {
      description: 'Funko id',
      type: 'number',
      demandOption: true,
    },
    name: {
      description: 'Funko name',
      type: 'string',
      demandOption: true,
    },
    description: {
      description: 'Funko description',
      type: 'string',
      demandOption: true,
    },
    type: {
      description: 'Funko type',
      type: 'string',
      demandOption: true,
    },
    genre: {
      description: 'Funko genre',
      type: 'string',
      demandOption: true,
    },
    franchise: {
      description: 'Funko franchise',
      type: 'string',
      demandOption: true,
    },
    franchise_number: {
      description: 'Funko franchise number',
      type: 'number',
      demandOption: true,
    },
    exclusive: {
      description: 'Funko exclusive',
      type: 'boolean',
      demandOption: true,
    },
    espCar: {
      description: 'Funko especial Caracteristics',
      type: 'string',
      demandOption: true,
    },
    price: {
      description: 'Funko price',
      type: 'number',
      demandOption: true,
    }
  }, (argv) => {
    if(checkUserDirSync(argv.user, './database')) {
      removeFunko('./database', argv.user, argv.id);
      createNewFunko('./database', argv.user, argv.id, argv.name,argv.description, argv.type, argv.genre, argv.franchise, argv.franchise_number, argv.exclusive, argv.espCar, argv.price);
      console.log(chalk.bgGreen("Funko actualizado correctamente!"))
      exit(0);
    } else {
      console.log(chalk.bgRed("No existe el usuario con el que esta intentando acceder en nuestra base de datos!"))
      exit(0);
    }
  })
```

El cuarto comando desarrollado ha sido _list_, a este se le pasa como parametro solamente el usuario del cual se quiera saber su colección de funkos y muestra toda la información de cada uno de los funkos del usuario pasado por parámetro.

Mencionar que también se comprueba si el usuario esta registrado en la base de datos, en caso de no ser asi se muestra por consola un mensaje de error.

LIST -- Lista el contenido de cada funko de la colección de un usuario

```ts
export function listFunko(path: string, user: string): void {
  const newPath = `${path}/${user}`;
  const files = fs.readdirSync(newPath).filter((file) => file.endsWith('.json'));

  files.forEach((file) => {
    const data = fs.readFileSync(`${newPath}/${file}`, 'utf-8');
    const jsonData = JSON.parse(data);
    printJson(jsonData);
  });
}
```

Por último se ha desarrollado el comando _read_ al cual se le pasan por parámetro un usuario y un ID, de manera similar al anterior muestra el contenido de los funkos. En este caso solamente de aquel que coincida con la ID pasada por parámetro.

En este comando se realizan dos comprobaciones, en primer lugar si el usuario existe y en segundo lugar si dentro de la colección de dicho usuario hay un funko con la id que se pasa como parámetro, en cualquiera de los dos casos si no se cumple la condición se emite un mensaje de error notificando concretamente que ha fallado.

READ -- Muestra el contenido de un funko por su ID de la colección de un usuario.

```ts
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
```

## __3.Ejemplo de uso de la aplicación:__ 

``` console
$node ./dist/Funko/funko-app.js add --user Adrian --id 3 --name "Black_Panther" --description "Pop de Black Panther" --type "Pop!" --genre "Film & TV" --franchise "Marvel" --franchise_number 5 --exclusive true --espCar "Brilla y mueve la cabeza" --price 45 
Funko creado correctamente

$node ./dist/Funko/funko-app.js add --user Adrian --id 3 --name "Black_Panther" --description "Pop de Black Panther" --type "Pop!" --genre "Film & TV" --franchise "Marvel" --franchise_number 5 --exclusive true --espCar "Brilla y mueve la cabeza" --price 45 
Ya se encuentra un funko con el id 3 y nombre Black_Panther en su base de datos

$node ./dist/Funko/funko-app.js list --user Eva
--------------------------------
id1
nameDeku
descriptionPersonaje animado
typePop!
genreAnime
franchiseMyHeroAcademy
franchise_number1
exclusivetrue
especialCaracteristicsbrilla
price15
--------------------------------
--------------------------------
id2
nameUrabity
descriptionPersonaje animado
typePop!
genreAnime
franchiseMyHeroAcademy
franchise_number20
exclusivetrue
especialCaracteristicsbrilla
price15
--------------------------------

$node ./dist/Funko/funko-app.js update --user Adrian --id 3 --name "Black_Panther" --description "Pop de Black Panther de la pelicula Civil Warr" --type "Pop!" --genre "Film & TV" --franchise "Marvel" --franchise_number 1 --exclusive false --espCar "Brilla" --price 23 
Funko actualizado correctamente!

$node ./dist/Funko/funko-app.js update --user Adrian --id 4 --name "Black_Panther" --description "Pop de Black Panther de la pelicula Civil Warr" --type "Pop!" --genre "Film & TV" --franchise "Marvel" --franchise_number 1 --exclusive false --espCar "Brilla" --price 23 
No se ha encontrado el funko de id 4 en la coleccion de Adrian

$node ./dist/Funko/funko-app.js read --user Adrian --id 1
--------------------------------
id1
nameJohn_Nieve
descriptionJhon nieve de la casa Stark
typePop!
genreAnime
franchiseGoT
franchise_number2
exclusivefalse
especialCaracteristicsBRILLA
price120
--------------------------------

$node ./dist/Funko/funko-app.js read --user Adrian --id 5
No se ha encontrado el funko de id 5 en la coleccion de Adrian

$node ./dist/Funko/funko-app.js remove --user Eva --id 3
Se ha removido con exito el funko de id 3 de la coleccion de Eva

$node ./dist/Funko/funko-app.js remove --user Eva --id 3
No se ha encontrado el funko de id 3 en la coleccion de Eva

```

## __4.Dificultades/Reflexión__

No ha sido una práctica realmente dificil en cuanto al desarrollo de la aplicación. Considero que es una de las prácticas mas entretenidas de la asignatura hasta la fecha.

Las únicas dificultades que tuve fueron en cuanto a la coexistencia de commonJS y el módulo ESM cuya solución quedo reflejada en el [apartado 2](#coexistencia-esm-y-commonjs).

## __5.Referencias__

[Apuntes bloque 2 de la asignatura](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/)
[GFuion de la práctica](https://ull-esit-inf-dsi-2223.github.io/prct09-filesystem-funko-app/)
[Coveralls](https://coveralls.io/)
[SonarCloud](https://sonarcloud.io/explore/projects)
[Documentación NODE.js](https://nodejs.org/docs/latest-v19.x/api/fs.html)
[Doc yargs](https://www.npmjs.com/package/yargs)
[Doc chalk](https://www.npmjs.com/package/chalk)