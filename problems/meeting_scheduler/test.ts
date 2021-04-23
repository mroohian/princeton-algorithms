import {
  meetingScheduler,
  CustomDate,
  DateRange,
} from './meeting_scheduler.ts';

const calendar1: DateRange[] = [
  { start: CustomDate.todayAt(9, 0), end: CustomDate.todayAt(10, 30) },
  { start: CustomDate.todayAt(12, 0), end: CustomDate.todayAt(13, 0) },
  { start: CustomDate.todayAt(16, 0), end: CustomDate.todayAt(18, 0) },
];

const dailyBound1: DateRange = {
  start: CustomDate.todayAt(9, 0),
  end: CustomDate.todayAt(20, 0),
};

const calendar2: DateRange[] = [
  { start: CustomDate.todayAt(10, 0), end: CustomDate.todayAt(11, 30) },
  { start: CustomDate.todayAt(12, 30), end: CustomDate.todayAt(14, 30) },
  { start: CustomDate.todayAt(14, 30), end: CustomDate.todayAt(15, 0) },
  { start: CustomDate.todayAt(16, 0), end: CustomDate.todayAt(17, 0) },
];

const dailyBound2: DateRange = {
  start: CustomDate.todayAt(10, 0),
  end: CustomDate.todayAt(18, 30),
};

const result = meetingScheduler(
  calendar1,
  dailyBound1,
  calendar2,
  dailyBound2,
  30 * 60 * 1000 // 30 minutes in ms
);

console.log(result);
