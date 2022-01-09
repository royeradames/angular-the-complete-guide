import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "displayOddOrEven",
  // pure: false,
})
export class DisplayOddOrEvenPipe implements PipeTransform {
  transform(value: number[], isOdd = true): number[] {
    if (isOdd) {
      return value.filter((n) => n % 2 !== 0);
    } else {
      return value.filter((n) => n % 2 === 0);
    }
  }
}
