import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CounterContainer from ".";

describe("表示確認", () => {
  it("props.title = 'test'だった場合、見出し１に「test」が表示される", () => {
    // GIVEN
    render(<CounterContainer title={"test"} />);
    // THEN
    screen.debug();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("test");
  });
});

describe("動作確認", () => {
  it("初期表示、カウンターの数値は0である", () => {
    // GIVEN
    render(<CounterContainer title={""} />);
    // WHEN
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("0");
  });
  it("+ボタン押下した場合、カウンターの数値は元の数値から +1 した数値へ変更する", async () => {
    // GIVEN
    render(<CounterContainer title={""} />);
    const beforeNum = Number(
      screen.getByRole("heading", { level: 2 }).textContent
    );

    // THEN
    await userEvent.click(screen.getByRole("button", { name: "+" }));

    // WHEN
    const afterNum = beforeNum + 1;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      String(afterNum)
    );
  });
  it("-ボタン押下した場合、カウンターの数値は元の数値から -1 した数値へ変更する", async () => {
    // GIVEN
    render(<CounterContainer title={""} />);
    const beforeNum = Number(
      screen.getByRole("heading", { level: 2 }).textContent
    );

    // THEN
    await userEvent.click(screen.getByRole("button", { name: "-" }));

    // WHEN
    const afterNum = beforeNum - 1;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      String(afterNum)
    );
  });
});
