import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { describe, test, expect } from "vitest";

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

    expect((input as HTMLInputElement).value).toBe()
  })
})