import * as fs from 'fs';
import * as path from 'path';

import { callbackClassicType } from './../data-structures/types/callback.types';

export class Lib {
  static baseDir = path.join(__dirname, './../.data/');

  static create(directory: string, fileName: string, data: any, callback: callbackClassicType): void {
    fs.open(
      `${this.baseDir}${directory}/${fileName}.json`,
      'wx',
      (error: NodeJS.ErrnoException, fileDescriptor: number) => {
        if (!error) {
          // tslint:disable-next-line: no-shadowed-variable
          fs.write(fileDescriptor, JSON.stringify(data), (error: NodeJS.ErrnoException) => {
            if (!error ) {
              // tslint:disable-next-line:no-shadowed-variable
              fs.close(fileDescriptor, (error: NodeJS.ErrnoException) => {
                if (error) {
                  callback('Error closing new file.');
                }
              });
            } else {
              callback('Error writing to new file.')
            }
          })
        } else {
          callback('Could not create new file, it may already exist.');
        }
      }
    );
  }
  static read(directory: string, fileName: string, callback: callbackClassicType): void {
    fs.readFile(
      `${this.baseDir}${directory}/${fileName}.json`,
      {
        encoding: 'utf8'
      },
      (error: NodeJS.ErrnoException, data: string) => {
        if (!error) {
          callback('', data);
        } else {
          callback('Could not read file, it may not exist.');
        }
      }
    );
  }
  static update(directory: string, fileName: string, data: any, callback: callbackClassicType): void {
    fs.open(
      `${this.baseDir}${directory}/${fileName}.json`,
      'r+',
      (error: NodeJS.ErrnoException, fileDescriptor: number) => {
        if (!error) {
          fs.truncate(
            `${this.baseDir}${directory}/${fileName}.json`,
            // tslint:disable-next-line: no-shadowed-variable
            (error: NodeJS.ErrnoException) => {
              if (!error) {
                // tslint:disable-next-line: no-shadowed-variable
                fs.writeFile(fileDescriptor, JSON.stringify(data), (error: NodeJS.ErrnoException) => {
                  if (!error) {
                    // tslint:disable-next-line: no-shadowed-variable
                    fs.close(fileDescriptor, (error: NodeJS.ErrnoException) => {
                      if (error) {
                        callback('Error closing existing file.');
                      }
                    })
                  } else {
                    callback('Error writing to existing file.');
                  }
                })
              } else {
                callback('Error truncating file.');
              }
            }
          )
        } else {
          console.log('Could not open the file for updating, it may not exist.')
        }
      }
    );
  }
  static delete(directory: string, fileName: string, callback: callbackClassicType): void {
    fs.unlink(
      `${this.baseDir}${directory}/${fileName}.json`,
      (error: NodeJS.ErrnoException) => {
        if (error) {
          callback('Error deleting file.')
        }
      }
    )
  }
}