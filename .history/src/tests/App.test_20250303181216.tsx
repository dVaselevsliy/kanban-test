import { render } from "@testing-library/react";
import { App } from "antd";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import { store } from "../redux/store";

describe('Testing Input', () => {
  test('entering text into Input updates its value', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter you link')
    expect(input).toBeInThe
  })
})