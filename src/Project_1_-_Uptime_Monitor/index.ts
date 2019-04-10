import { WebServer } from './web-server';

import { Lib } from './lib';

// Lib.create(
//   'test',
//   'testFile',
//   {
//     name: 'John Smith'
//   },
//   (error: string) => error ? console.log(error) : null
// );
// Lib.read(
//   'test',
//   'testFile',
//   (error: string, data?: string) => error ? console.log(error) : console.log(data)
// );
// Lib.delete(
//   'test',
//   'testFile',
//   (error: string) => console.log(error)
// );

Lib.update(
  'test',
  'testFile',
  {
    name: 'Jane Smith'
  },
  (error: string) => error ? console.log(error) : null
);
Lib.update(
  'test',
  'testFile',
  {
    name: 'Cain Lee'
  },
  (error: string) => error ? console.log(error) : null
);
const MyServer = WebServer.Instance;
MyServer.startServers();
