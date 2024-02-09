import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {

  static checkType(value: string) {
    if (value.startsWith('@') && value.length > 2) {
      return 'user-tag';
    } else if (value.startsWith('#') && value.length > 2) {
      return 'hash-tag';
    } else {
      return 'text';
    }
  }

  transform(value: string, args?: any): any {
    return value
      .split(/([#,@][а-яА-ЯёЁa-zA-Z0-9-_]{2,})/)
      .map((val: string) => {
        const type = TagsPipe.checkType(val);
        if (type === 'user-tag') {
          val = val.replace('@', '');
        }

        if (type === 'hash-tag') {
          val = val.replace('#', '');
        }

        return {

          type: type,
          content: val
        };
      });
  }


}
