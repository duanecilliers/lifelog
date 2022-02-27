import { render } from '@testing-library/react';

import TextEditor from './text-editor';

describe('TextEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextEditor />);
    expect(baseElement).toBeTruthy();
  });
});
