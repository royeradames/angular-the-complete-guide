import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sortBy",
  pure: false,
})
export class SortByPipe implements PipeTransform {
  transform(
    value: [],
    sortCondition: string,
    propPath: string,
    order: "asc" | "desc" = "asc"
  ): [] {
    const sortValue = value.sort((a, b) => {
      // when there is a path use [propPath] but when there is not use the value directly
      const aValue = propPath
        ? a[propPath] === sortCondition
        : a === sortCondition;
      const bValue = propPath
        ? b[propPath] === sortCondition
        : b === sortCondition;
      // 1 moves fordward and -1 moves backward
      /* in asc:
      - do nothing when both a(t the front) and b(at the end) are equal to the sorting condition
      - if a(t the front) has the sorting condition move it to the back
      - if b(ack) could be commentted out

      in desc:
      - only return 0 and moveB are needed

      move the b(ack) to the a(t the front) by returning 1, and move the otherones to the back  */
      const moveA = order === "asc" ? -1 : 1;
      const moveB = order === "asc" ? 1 : -1;
      // if both values are the same sortCondition do nothing
      if (aValue && bValue) {
        return 0;
      }
      if (aValue) return moveA;
      if (bValue) return moveB;
    });
    // sort the value by value status being "stable"

    // const sortValue =
    return sortValue;
  }
}
