import { render } from '@testing-library/react';

import TextField from './textfield';

describe('TextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextField name="my-tield field" />);
    expect(baseElement).toBeTruthy();
  });
});
