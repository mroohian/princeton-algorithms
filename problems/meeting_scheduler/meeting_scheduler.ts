export class CustomDate extends Date {
  private constructor(time: number) {
    super(time);
  }

  public [Deno.customInspect](_depth: number, _opts: number): string {
    return this.toString();
  }

  public toString(): string {
    return `'${this.toLocaleTimeString()}'`;
  }

  public static todayAt(hour: number, minutes: number) {
    const date = new Date(0, 0, 0, hour, minutes, 0, 0);
    return new CustomDate(date.getTime());
  }

  public static fromTime(time: number): CustomDate {
    return new CustomDate(time);
  }
}

export type DateRange = { start: CustomDate; end: CustomDate };

const DAY_START = CustomDate.todayAt(0, 0);
const DAY_END = CustomDate.todayAt(23, 59);

function merge(range1: DateRange, range2: DateRange): DateRange[] {
  const sorted = range1.start <= range2.start;

  const former = sorted ? range1 : range2;
  const latter = sorted ? range2 : range1;

  // 1.  [     ] { } s2 > e1  --> keep both
  // 2a. [ {   ] }   s2 <= e1 ----> merge {s1, max(e1, e2)}
  // 2b. [ { } ]     s2 <= e1 -/
  if (latter.start > former.end) {
    return [former, latter];
  }

  return [
    {
      start: former.start,
      end: CustomDate.fromTime(
        Math.max(former.end.getTime(), latter.end.getTime())
      ),
    },
  ];
}

export function meetingScheduler(
  calendar1: DateRange[],
  dailyBound1: DateRange,
  calendar2: DateRange[],
  dailyBound2: DateRange,
  meetingLength: number
): DateRange[] {
  const calendar1WithBounds: DateRange[] = [
    { start: DAY_START, end: dailyBound1.start },
    ...calendar1,
    { start: dailyBound1.end, end: DAY_END },
  ];

  const calendar2WithBounds: DateRange[] = [
    { start: DAY_START, end: dailyBound2.start },
    ...calendar2,
    { start: dailyBound2.end, end: DAY_END },
  ];

  const sorted: DateRange[] = [];

  let i = 0;
  let j = 0;
  while (i < calendar1WithBounds.length || j < calendar2WithBounds.length) {
    const range1 = calendar1WithBounds[i];
    const range2 = calendar2WithBounds[j];

    if (range1 === undefined) {
      j++;
      sorted.push(range2);
      continue;
    }

    if (range2 === undefined) {
      i++;
      sorted.push(range1);
      continue;
    }

    if (range1.start < range2.start) {
      i++;
      sorted.push(range1);
      continue;
    }

    j++;
    sorted.push(range2);
    continue;
  }

  const blocked: DateRange[] = [];
  blocked.push(sorted[0]);
  for (let k = 1; k < sorted.length; k++) {
    const top = blocked.pop() as DateRange;
    blocked.push(...merge(top, sorted[k]));
  }

  const result: DateRange[] = [];
  let prevEnd = DAY_START;
  for (let l = 0; l < blocked.length; l++) {
    const range = blocked[l];

    if (range.start.getTime() - prevEnd.getTime() >= meetingLength) {
      result.push({
        start: prevEnd,
        end: range.start,
      });
    }

    prevEnd = range.end;
  }

  return result;
}
