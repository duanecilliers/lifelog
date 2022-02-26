import { ElementType } from 'react';
import { PolymorphicComponentProps } from '../../types/PolymorphicComponentProps';

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
      data-active={age === year}
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

export default Link;
