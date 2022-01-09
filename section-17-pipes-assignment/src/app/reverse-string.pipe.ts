import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverseString",
})
export class ReverseStringPipe implements PipeTransform {
  transform(value: string): string {
    const reversedString = value.split("").reverse().join("");
    return reversedString;
  }
}
