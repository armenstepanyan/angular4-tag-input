import { Injectable } from '@angular/core';

@Injectable()
export class TagsService {

  constructor() { }

  getHotKeys = () => {

    var keys = {
      backspace: 8,
      tab: 9,
      enter: 13,
      escape: 27,
      space: 32,
      up: 38,
      down: 40,
      left: 37,
      right: 39,
      delete: 46,
      comma: 188,
      semicolon: 186
    };


    if (isBrowserFirefox()) {
      keys.semicolon = 59;
    }

    function isBrowserFirefox() {
      return (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)

    }
    return keys;
  }

}
