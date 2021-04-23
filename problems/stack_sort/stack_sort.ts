export function stackSort(list: number[]): number[] {
  const stack1: number[] = [...list];
  const stack2: number[] = [];

  while (stack1.length > 0) {
    const value = stack1.pop() as number;

    let moved = 0;
    while (stack2.length > 0 && stack2[stack2.length - 1] > value) {
      stack1.push(stack2.pop() as number);
      moved++;
    }

    stack2.push(value);

    while (moved > 0) {
      stack2.push(stack1.pop() as number);
      moved--;
    }

  }

  return stack2;
}