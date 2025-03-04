import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, test, vi } from "vitest";
import { store } from "../redux/store";
import userEvent from "@testing-library/user-event";
import App from '../App';
import * as dataArray from '../array/dataArray';

vi.mock('../../src/array/dataArray', async () => {
  const actual = await vi.importActual<typeof import('../../src/array/dataArray')>('../../src/array/dataArray');
  return {
    ...actual,
    setLink: vi.fn(),
  };
});

describe('Testing Input', () => {
  test('Entering text into Input updates its value', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter you link');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "https://github.com/facebook/react");

    expect((input as HTMLInputElement).value).toBe("https://github.com/facebook/react");
  });
});