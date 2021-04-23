function print(list: number[], start: number, i: number, j: number, color1 = 'red', color2 = 'green', color3 = 'blue'): void {
  const cssList: string[] = [];

  let valuesString = list.reduce((prev, value, index) => {
    if (index === start) {
      cssList.push(`color:${color1}`, 'color:initial');
      if (start !== 0) {
        return `${prev}%c${value}%c,`;
      }
      return `[%c${value}%c,`;
    } else if (index === 0) {
      return `[${value},`;
    } else if (index === list.length - 1) {
      if (index === j) {
        cssList.push(`color:${color3}`, 'color:initial');
        return `${prev}%c${value}%c]`;
      }
      return `${prev}${value}]`;
    } else if (index === i) {
      if (i === j) {
        cssList.push(`color:${color2}`, 'color:initial');
        cssList.push(`color:${color3}`, 'color:initial');
        return `${prev}%c${value}%c=%c${value}%c,`;
      }
      cssList.push(`color:${color2}`, 'color:initial');
      return `${prev}%c${value}%c,`;
    } else if (index === j) {
      cssList.push(`color:${color3}`, 'color:initial');
      return `${prev}%c${value}%c,`;
    }

    return `${prev}${value},`;
  }, '');

  console.log(valuesString, ...cssList);
}

export function partition(list: number[], start: number, end: number): number {
  const partitionKey = list[start];

  let i = start + 1;
  let j = end;

  console.log('--------------------------');
  console.log('p', i, j, '=', partitionKey);
  print(list, start, i, j);

  while (true) {
    while (partitionKey > list[i]) {
      i++;

      console.log('i++', i);

      print(list, start, i, j);

      if (i === end) {
        break;
      }
    }

    while (partitionKey < list[j]) {
      j--;

      console.log('j--', j);

      print(list, start, i, j);

      if (j === start + 1) {
        break;
      }
    }

    if (i > j) {
      break;
    }

    // swap
    [list[i], list[j]] = [list[j], list[i]];

    console.log('swap');
    print(list, start, i, j);
    // console.log(JSON.stringify(list));
  }

  [list[start], list[j]] = [list[j], list[start]];

  console.log('move p');
  print(list, start, i, j, 'initial', 'initial', 'red');

  return j;
}

function quickSortLogic(list: number[], start: number, end: number): void {
  console.log('--------------------------');
  console.log('quickSortLogic', start, end);

  if (start >= end) {
    return;
  }

  const mid = partition(list, start, end);
  console.log('mid', mid);

  if (mid > start + 1) {
    quickSortLogic(list, start, mid - 1);
  }
  if (mid < end - 1) {
    quickSortLogic(list, mid + 1, end);
  }
}

export function quickSort(list: number[]): number[] {
  // list.shuffle();
  quickSortLogic(list, 0, list.length - 1);
  return list;
}
