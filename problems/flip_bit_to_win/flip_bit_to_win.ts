function toBinary(value: number, length: number): string {
  const result = [];

  for (let i = 0; i < length; i++) {
    const bit = 1 << i;
    if ((value & bit) === bit) {
      result.unshift(1);
    } else {
      result.unshift(0);
    }
  }

  return result.join('');
}

function getAlternatingSequences(value: number, length: number): number[] {
  const result: number[] = [];

  let lookingFor = false;
  let counter = 0;

  for (let i = 0; i < length; i++) {
    const bit = (value & (1 << i)) === 1 << i;

    if (bit === lookingFor) {
      counter++;
      continue;
    }

    result.push(counter);
    lookingFor = !lookingFor;
    counter = 1;
  }

  result.push(counter);

  return result;
}

export function flipBitToWin(value: number, length = 32): number {
  console.log(toBinary(value, length));

  const sequences = getAlternatingSequences(value, length);

  let optimalSize = 0;

  for (let i = 0; i < sequences.length; i += 2) {
    const nZeros = sequences[i];
    const nOnesToTheRight = i >= 1 ? sequences[i - 1] : 0;
    const nOnesToTheLeft = i < sequences.length - 1 ?  sequences[i + 1] : 0;

    let sequenceSize : number;
    if (nZeros === 0) {
      sequenceSize = Math.max(nOnesToTheLeft, nOnesToTheRight);
    } else if (nZeros === 1) {
      sequenceSize = 1 + nOnesToTheLeft + nOnesToTheRight;
    } else {
      // ...011110001110...
      // ...01111[0]0[0]1110...
      sequenceSize = 1 + Math.max(nOnesToTheLeft, nOnesToTheRight);
    }

    optimalSize = Math.max(optimalSize, sequenceSize);
  }

  return optimalSize;
}

export function flipBitToWin1(value: number, length = 32): number {
  console.log(toBinary(value, length));

  if (~value === 0) {
    return length;
  }

  let previousLength = 0;
  let currentLength = 0;

  let optimalSize = 0;

  while (value !== 0) {
    if ((value & 1) === 1) {
      currentLength++;
    } else {
      previousLength = ((value & 2) === 0) ? 0 : currentLength;
      currentLength = 0;
    }

    optimalSize = Math.max(optimalSize, previousLength + currentLength + 1);
    value = value >>> 1;
  }

  return optimalSize;
}
