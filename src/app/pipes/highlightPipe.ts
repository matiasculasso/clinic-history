import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {

  transform(text: string, search): string {
    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    pattern = pattern.split(' ').filter((t) => {
      return t.length > 0;
    }).join('|');

    const regex = new RegExp(pattern, 'gi');
    return search.length >= 3 ? text.replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }
}
