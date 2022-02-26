import { ElementType } from 'react';
import { splitEvery, map, add, range } from 'ramda';
import { differenceInWeeks } from 'date-fns';
import Link from './week-link';

export interface WeekCalendarProps {
  year: string;
  linkElement?: ElementType;
}

export function WeekCalendar({ year, linkElement }: WeekCalendarProps) {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-30`);
  const weeksInYear = differenceInWeeks(endDate, startDate);
  const groupedWeeks = splitEvery(10, map(add(1), range(0, weeksInYear)));

  return (
    <div
      data-name="life-calendar"
      className="flex flex-col items-stretch aspect-square"
    >
      {groupedWeeks.map((row, i) => (
        <div
          key={`week-row-${i}`}
          className="grid grid-cols-10 flex-1 space-x-1"
        >
          {row.map((week, i) => {
            const linkProps = linkElement
              ? { to: `/age/${year}`, as: linkElement }
              : {};
            return <Link key={`week-${i}`} week={week} {...linkProps} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default WeekCalendar;
