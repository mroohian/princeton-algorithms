class ListNode {
  public constructor(public value: number, public next?: ListNode | undefined) {}
}

export function generateLinkedListNumber(
  digits: number[]
): ListNode | undefined {
  if (digits.length === 0 || digits.some((d) => d < 0 || d > 9)) {
    return undefined;
  }

  let result: ListNode | undefined = undefined;
  let current: ListNode | undefined = undefined;

  for (const digit of digits) {
    const prev = current;

    current = new ListNode(digit);
    if (prev !== undefined) {
      prev.next = current;
    }

    if (result === undefined) {
      result = current;
    }
  }

  return result;
}

export function sumLinkedListNumbers(
  input1: ListNode | undefined,
  input2: ListNode | undefined
): ListNode | undefined {
  let result: ListNode | undefined = undefined;

  let pointer1: ListNode | undefined = input1;
  let pointer2: ListNode | undefined = input2;

  let prev: ListNode | undefined = undefined;
  let current: ListNode | undefined = undefined;

  let carryValue = 0;
  while (pointer1 !== undefined || pointer2 !== undefined || carryValue !== 0) {
    const digit1 = pointer1?.value ?? 0;
    const digit2 = pointer2?.value ?? 0;

    const sum = digit1 + digit2 + carryValue;

    const value = sum % 10;
    carryValue = (sum - value) / 10;

    prev = current;
    current = new ListNode(value);
    if (prev !== undefined) {
      prev.next = current;
    }

    if (result === undefined) {
      result = current;
    }

    pointer1 = pointer1?.next;
    pointer2 = pointer2?.next;
  }

  return result;
}
