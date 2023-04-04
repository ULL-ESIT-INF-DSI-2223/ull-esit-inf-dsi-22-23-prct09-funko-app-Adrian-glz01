import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import * as chalk from "chalk";

import {checkUserDirSync} from './utilities';
import {createNewUser} from './manageFunction';
import {createNewFunko} from './manageFunction';
import {listFunko} from './manageFunction';
import {findFunkoByID} from './manageFunction';
import {removeFunko} from './manageFunction';

import { exit } from 'process';

/**
 * @description Comando para añadir un Funko
*/
yargs(hideBin(process.argv))
.command('add', 'Adds a funko', {
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
    // comprobamos si el usuario existe
    if (checkUserDirSync(argv.user, './database')) {
      createNewFunko('./database', argv.user, argv.id, argv.name,argv.description, argv.type, argv.genre, argv.franchise, argv.franchise_number, argv.exclusive, argv.espCar, argv.price);
      console.log(chalk.black.bgGreen.bold(`Funko creado correctamente`));
      exit(0);
    } else {
      // si no existe lo creamos (registrarlo en la base de datos consta de crear un directorio con el nombre del usuario, y este ha de ser unico)
      createNewUser(argv.user, './database');
      console.log(chalk.black.bgGreen.bold(`Usuario creado correctamente`));
      createNewFunko('./database', argv.user, argv.id, argv.name,argv.description, argv.type, argv.genre, argv.franchise, argv.franchise_number, argv.exclusive, argv.espCar, argv.price);
      console.log(chalk.black.bgGreen.bold(`Funko creado correctamente`));
      exit(0);
    }
  })
  .help()
  .argv

  /**
   * @description Comando para actualizar el contenido de un Funko
   */
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

/**
 * @description Comando para eliminar un Funko
 */
yargs(hideBin(process.argv))
  .command('remove', 'Remove a funko from an user collection', { 
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true,
    },
    id: {
      description: 'Funko id',
      type: 'number',
      demandOption: true,
    }
  }, (argv)=> {
    if(checkUserDirSync(argv.user, './database')) {
      removeFunko('./database', argv.user, argv.id);
      console.log(chalk.green.bold('Se ha removido con exito el funko de id ' + argv.id + ' de la coleccion de ' + argv.user));
      exit(0);
    } else {
      console.log(chalk.bgRed("No existe el usuario con el que esta intentando acceder en nuestra base de datos!"))
      exit(0);
    }
  })
  .help()
  .argv

/**
 * @description Comando para listar todos los Funkos de un usuario
 */
yargs(hideBin(process.argv))
  .command('list', 'List all funkos', {
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true, // obligatorio
    }
  }, (argv) => {
    if(checkUserDirSync(argv.user, './database')) {
      listFunko('./database', argv.user);
      exit(0);
    } else {
      console.log(chalk.bgRed("No existe el usuario con el que esta intentando acceder en nuestra base de datos!"))
      exit(0);
    }
  })
  .help()
  .argv

/**
 * @description Comando para mostrar el contenido de un funko en concreto
 */
yargs(hideBin(process.argv))
  .command('read', 'Find a funko in user folder by ID.', {
    user: {
      description: 'User name',
      type: 'string',
      demandOption: true,
    },
    id: {
      description: 'Funko id',
      type: 'number',
      demandOption: true,
    }
  }, (argv) => {
    if(checkUserDirSync(argv.user, './database')) {
      findFunkoByID('./database', argv.user, argv.id);
      exit(0);
    } else {
      console.log(chalk.bgRed("No existe el usuario con el que esta intentando acceder en nuestra base de datos!"))
      exit(0);
    }
  })
  .help()
  .argv

  