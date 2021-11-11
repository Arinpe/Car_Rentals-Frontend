import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Form from '../../components/Form';

describe('with valid Input', () => {
  const mockOnSubmit = jest.fn();
  beforeEach(async () => {
    const { container } = render(<Form handleSubmit={mockOnSubmit} />);

    const form = container.querySelector('form');

    await act(async () => {
      await fireEvent.submit(form);
    });
  });

  test('should call the onsubmit function', async () => {
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
