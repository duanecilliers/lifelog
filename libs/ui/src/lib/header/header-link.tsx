import { ElementType } from 'react';
import { PolymorphicComponentProps } from '../../types/PolymorphicComponentProps';

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface Props {}

type HeaderLinkProps<C extends ElementType> = PolymorphicComponentProps<C>;

const HeaderLink = <C extends ElementType = 'a'>({
  as,
  ...props
}: HeaderLinkProps<C>) => {
  const Component = as ?? 'a';
  return <Component {...props} />;
};

export default HeaderLink;
