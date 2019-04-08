import { WebServer } from './web-server';

import { Lib } from './lib';

// Lib.create(
//   'test',
//   'testFile',
//   {
//     name: 'John Smith'
//   },
//   (error: NodeJS.ErrnoException) => error ? console.log(error) : null
// );
// Lib.read(
//   'test',
//   'testFilef',
//   (error: string, data?: string) => error ? console.log(error) : console.log(data)
// );

const MyServer = WebServer.Instance;
MyServer.startServers();
