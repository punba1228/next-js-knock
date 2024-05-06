import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FormButton from ".";

// クリック関数をMock
const clickEventMock = jest.fn();

const TEST_BG_CLASS = "bg-test";
const TEST_LABEL_TEXT = "label-test";

describe("表示確認", () => {
  test(
    `props.bgColor = ${TEST_BG_CLASS} だった場合、ボタンのクラス要素に「${TEST_BG_CLASS}」が含まれている\n` +
      `props.labelText = ${TEST_LABEL_TEXT} だった場合、ボタンに表示される文字列は「${TEST_LABEL_TEXT}」である`,
    () => {
      // GIVE
      render(
        <FormButton bgColor={TEST_BG_CLASS} labelText={TEST_LABEL_TEXT} />
      );
      // THEN
      expect(screen.getByRole("button").getAttribute("class")).toBe(
        `text-center rounded-md text-white px-4 py-2 font-thin ${TEST_BG_CLASS}`
      );
      expect(screen.getByRole("button")).toHaveTextContent(TEST_LABEL_TEXT);
    }
  );
  test.each`
    isDisabled   | expected
    ${undefined} | ${false}
    ${false}     | ${false}
    ${true}      | ${true}
  `(
    "props.isDisabled = $isDisabled\n" +
      "falsyだった場合、ボタン属性「disabled」が存在しない\n" +
      "truthyだった場合、ボタン属性「disabled」が存在する\n",
    async ({ isDisabled, expected }) => {
      // GIVEN
      render(
        <FormButton
          bgColor={TEST_BG_CLASS}
          labelText={TEST_LABEL_TEXT}
          clickEvent={clickEventMock}
          isDisabled={isDisabled}
        />
      );
      // THEN
      if (expected) {
        expect(screen.getByRole("button")).toBeDisabled();
      } else {
        expect(screen.getByRole("button")).toBeEnabled();
      }
    }
  );
});

describe("動作確認", () => {
  it("ボタンをクリックすると、モック関数:clickEventMockが呼び出される", async () => {
    // GIVEN
    render(
      <FormButton
        bgColor={TEST_BG_CLASS}
        labelText={TEST_LABEL_TEXT}
        clickEvent={clickEventMock}
      />
    );
    // WHEN
    await userEvent.click(screen.getByRole("button"));
    // THEN
    expect(clickEventMock).toHaveBeenCalledTimes(1);
  });
});
