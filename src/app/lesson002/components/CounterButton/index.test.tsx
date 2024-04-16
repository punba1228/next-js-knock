import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CounterButton from ".";

// クリック関数をMock
const clickEventMock = jest.fn();

describe("表示確認", () => {
  test.each`
    symbol | expected
    ${"+"} | ${"+"}
    ${"-"} | ${"-"}
  `(
    "props.symbol = $symbol だった場合、ボタンに表示される文字列は「$expected」である`",
    async ({ symbol, expected }) => {
      // GIVEN
      render(<CounterButton symbol={symbol} clickEvent={clickEventMock} />);
      // THEN
      expect(screen.getByRole("button")).toHaveTextContent(expected);
    }
  );
  test.each`
    isOutline    | expected
    ${undefined} | ${"bg-blue-600 text-white"}
    ${false}     | ${"bg-blue-600 text-white"}
    ${true}      | ${"bg-white text-blue-600"}
  `(
    "props.isOutline = $isOutline だった場合、ボタンのクラス要素に「$expected」が含まれている`",
    async ({ isOutline, expected }) => {
      // GIVEN
      render(
        <CounterButton
          symbol={"+"}
          isOutline={isOutline}
          clickEvent={clickEventMock}
        />
      );
      // THEN
      expect(
        screen.getByRole("button").firstElementChild?.getAttribute("class")
      ).toBe(
        `flex table-cell align-middle text-center w-12 h-12 border-2 rounded-full border-blue-600 ${expected}`
      );
    }
  );
});

describe("動作確認", () => {
  it("ボタンをクリックすると、モック関数:clickEventMockが呼び出される", async () => {
    // GIVEN
    render(<CounterButton symbol={"+"} clickEvent={clickEventMock} />);
    // WHEN
    await userEvent.click(screen.getByRole("button"));
    // THEN
    expect(clickEventMock).toHaveBeenCalledTimes(1);
  });
});
