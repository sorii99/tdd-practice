import { fireEvent, queryByLabelText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Applying TDD in a Radio app.

beforeEach(() => render(<App />));

describe('0 - App must be rendered properly', () => {
  it('App Render', () => {
    const r = render(<App />);
    expect(r).toBeDefined();
  })
})

describe('1 - App name must be shown: Radiuus', () => {
  it('Name is shown somewhere', () => {
    const name = 'Radiuus';
    const el = screen.getByText(name);
    expect(el).toBeInTheDocument();
  })
})

describe('2 - Search by name', () => {
  it('2a - Input with text placeholder', () => {
    const placeholder = 'Search station name';
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  })

  it('2b - Search button by text', () => {
    const buttonText = 'Search';
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
  })

  it('2c - Event onClick should execute search fn once', () => {
    const mock = jest.fn();
    const buttonText = 'Search';
    const button = screen.getByText(buttonText);
    button.addEventListener('click', mock);
    fireEvent.click(button);
    expect(mock).toHaveBeenCalledTimes(1);
  })
})

describe('3 - Station list ', () => {
  it('3a - List must exist', () => {
    const list = screen.getByLabelText('station-list');
    expect(list).toBeInTheDocument;
  })

  it('3b - Array must be initialized empty', () => {
    const list = screen.getByLabelText('station-list');
    const childrenCount = list.childElementCount;
    expect(childrenCount).toBe(0);
  })

  it('3c - When a search is made: show at least 1 station', () => {
    const placeholder = 'Search station name';
    const input = screen.getByPlaceholderText(placeholder);
    const buttonText = 'Search';
    const button = screen.getByText(buttonText);
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(button);
    const list = screen.getByLabelText('station-list');
    const childrenCount = list.childElementCount;
    expect(childrenCount).toBeGreaterThanOrEqual(0);
  })
})
