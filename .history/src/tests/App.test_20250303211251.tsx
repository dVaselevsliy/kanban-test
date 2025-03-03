import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, test, vi } from "vitest";
import { store } from "../redux/store";
import userEvent from "@testing-library/user-event";
import App from '../App';
import * as dataArray from '../array/dataArray';

// 🛠️ Правильный мок setLink
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

describe('Form submit', () => {
  test('Calling setLink on form submit', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter you link');
    const button = screen.getByRole("button", { name: /load/i });

    const testUrl = "https://github.com/facebook/react";

    await userEvent.type(input, testUrl);
    await userEvent.click(button);

    // Проверяем, что `setLink` был вызван 1 раз и с правильным аргументом
    expect(dataArray.setLink).toHaveBeenCalledTimes(1);
    expect(dataArray.setLink).toHaveBeenCalledWith(testUrl);
  });
});
