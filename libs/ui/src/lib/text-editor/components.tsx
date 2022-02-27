import { forwardRef, PropsWithChildren, Ref } from 'react';
import cx from 'classnames';
import styles from './components.module.css';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

export const Icon = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(['material-icons', className, styles.icon])}
    />
  )
);

export const ButtonControl = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        [className, styles.button]
        // css`
        //   cursor: pointer;
        //   color: ${reversed
        //     ? active
        //       ? 'white'
        //       : '#aaa'
        //     : active
        //     ? 'black'
        //     : '#ccc'};
        // `
      )}
    />
  )
);

export const Menu = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => <div {...props} ref={ref} className={cx([className, styles.menu])} />
);

export const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => <Menu {...props} ref={ref} className={cx([className, styles.toolbar])} />
);
