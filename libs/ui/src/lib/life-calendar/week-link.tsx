import { ElementType } from 'react';
import { PolymorphicComponentProps } from '../../types/PolymorphicComponentProps';

interface Props {
  week: number;
  isActive?: boolean;
}

type WeekLinkProps<C extends ElementType> = PolymorphicComponentProps<C, Props>;

const WeekLink = <C extends ElementType = 'a'>({
  as,
  week,
  isActive = false,
  ...props
}: WeekLinkProps<C>) => {
  const Component = as ?? 'a';
  return (
    <Component
      {...props}
      key={`week-${week}`}
      data-active={isActive}
      className={
        `my-0.5 bg-transparent text-sm flex items-center justify-center rounded-full md:m-2 lg:m-4 xl:m-8 ${
          false && ` text-gray-300` /** @todo check if week is in the past */
        }
      ${true && ` text-gray-800` /** @todo check if week is in the future */}
      ${
        isActive && ` bg-blue-400 text-white`
      }` /** @todo check if week is current week */
      }
    >
      {week}
    </Component>
  );
};

export default WeekLink;
