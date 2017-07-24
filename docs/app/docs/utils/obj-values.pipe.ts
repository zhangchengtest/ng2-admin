import {
  Pipe, PipeTransform
} from '@angular/core';

@Pipe({ name: 'ObjValues',  pure: false })
export class ObjValuesPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}
