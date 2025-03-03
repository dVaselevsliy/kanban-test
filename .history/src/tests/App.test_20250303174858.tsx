import { App } from "antd";
import { Provider } from "react-redux";
import { describe, test } from "vitest";

describe('Testing Input', () => {
  test('entering text into Input updates its value', async () => {
    render(
      <Provider store={st}>
        <App />
      </Provider>
    )
  })
})