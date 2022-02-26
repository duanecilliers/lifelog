import { ElementType } from 'react';
import { splitEvery, map, add, range } from 'ramda';
import Link from './link';

export interface LifeCalendarProps {
  age: number;
  linkElement?: ElementType;
}

export function LifeCalendar({ age, linkElement }: LifeCalendarProps) {
  const groupedYears = splitEvery(10, map(add(1), range(0, 100)));
  return (
    <div
      data-name="life-calendar"
      className="flex flex-col items-stretch aspect-square"
    >
      {groupedYears.map((row, i) => (
        <div key={`row-${i}`} className="grid grid-cols-10 flex-1 space-x-1">
          {row.map((year) => {
            const linkProps = linkElement
              ? { to: `/age/${year}`, as: linkElement }
              : {};
            return <Link age={age} year={year} {...linkProps} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default LifeCalendar;
