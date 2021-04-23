export interface Comparator<Key> {
  compare(a: Key, b: Key): number;
}

export const DefaultMinComparator: Comparator<any> = {
  compare: (a, b): number => {
    if (a < b) {
      return 1;
    }

    if (a > b) {
      return -1;
    }

    return 0;
  },
};

export const DefaultMaxComparator: Comparator<any> = {
  compare: (a, b): number => {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  },
};
