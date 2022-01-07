/* pipes can be generated with ng generate pipe <pipe name> */
import { Pipe, PipeTransform } from "@angular/core";
/* filter the ngfor like array.filter */
@Pipe({
  name: "filter",
  /* by default pipes only render when the pipe changes
    - not by new data addded
  you can dissable this can when you add a new data with pure: false
  * - this is performance intensive
    - this is why there is no default filter pipe
   */
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    /* filter using a loop and a array */
    /* // quite if there is no length
    if (value.length === 0 || filterString === "") return value;

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray; */

    /* filter using filter method */
    // when ever you need something to be flexiable that means a variable should handle it
    const returnEverything = filterString === "";
    const filterItems = value.filter(
      (item) => item[propName] === filterString || returnEverything
    );
    return filterItems;
  }
}
