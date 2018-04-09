import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }

  parseError(errorObj: any): string {
    if (errorObj.error && errorObj.error.message) {
      return errorObj.error.message;
    } else if (errorObj.message) {
      return errorObj.message;
    } else {
      return 'Unknown error occured';
    }
  }

}
