import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { describe, expect, test, vi } from "vitest";
import { store } from "../redux/store";
import userEvent from "@testing-library/user-event";
import App from '../App';
import { setLink } from '../array/dataArray';

vi.mock('../array/dataArray', () => ({
  setLink: vi.fn()
}))

describe('Testing Input', () => {
  test('entering text into Input updates its value', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter you link');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "https://github.com/facebook/react")

    expect((input as HTMLInputElement).value).toBe("https://github.com/facebook/react")
  })
})

describe('Form submit', () => {
  test('Calling setLink on form submit', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })
}, )