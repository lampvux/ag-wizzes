import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addFriendfilter'
})
export class AddFriendPipe implements PipeTransform {
  transform(items: any, searchText: string): any {
    if (!items) { return null; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      if (it) {
        return (it.Name ? it.Name.toLowerCase().includes(searchText) : null )
         || (it.Email ? it.Email.toLowerCase().includes(searchText) : null );
      }
    });
  }

}
