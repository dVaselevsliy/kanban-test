import { App } from "antd";
import { Provider } from "react-redux";
import { describe, test } from "vitest";
import { store } from "../redux/store";

describe('Testing Input', () => {
  test('entering text into Input updates its value', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })
})