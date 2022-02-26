import { ElementType } from 'react';
import { splitEvery, map, add, range } from 'ramda';
import { PolymorphicComponentProps } from '../../types/PolymorphicComponentProps';

export interface LifeCalendarProps {
  age: number;
  linkElement?: ElementType;
}

interface Props {
  age: number;
  year: number;
}

type LinkProps<C extends ElementType> = PolymorphicComponentProps<C, Props>;

const Link = <C extends ElementType = 'a'>({
  as,
  age,
  year,
  ...props
}: LinkProps<C>) => {
  const Component = as ?? 'a';
  return (
    <Component
      {...props}
      key={`age-${year}`}
      className={`my-0.5 bg-transparent text-sm flex items-center justify-center rounded-full md:m-2 lg:m-4 xl:m-8 ${
        age > year && ` text-gray-300`
      }
      ${age < year && ` text-gray-800`}
      ${age === year && ` bg-blue-400 text-white`}`}
    >
      {year}
    </Component>
  );
};

export function LifeCalendar({ age, linkElement }: LifeCalendarProps) {
  const groupedYears = splitEvery(10, map(add(1), range(0, 100)));
  return (
    <div className="flex flex-col items-stretch aspect-square">
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
