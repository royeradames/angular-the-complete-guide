/* custom pipes for when you want to do something more than the default */

import { Pipe, PipeTransform } from "@angular/core";

// define the name of the pipe that will be used in the template
@Pipe({
  name: "shorten",
})

// pipreTransform is not required but is best pratice to have it require  transform method
export default class shortenPipe implements PipeTransform {
  // define how you want the text to be trasnform
  // adding arguments can be use to pass in data and customize the pipe
  transform(value: any, limit: number = 10) {
    if (value.length > limit) return value.substr(0, limit) + " ...";
    return value;
  }
}
