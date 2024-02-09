import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {
    const dus = new DefaultUrlSerializer();
    return dus.parse(encodeURI(url));
  }

  serialize(tree: UrlTree): any {
    const dus = new DefaultUrlSerializer();
    return dus.serialize(tree);
  }
}
