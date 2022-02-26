import { render } from '@testing-library/react';

import LifeCalendar from './life-calendar';

describe('LifeCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LifeCalendar />);
    expect(baseElement).toBeTruthy();
  });
});
