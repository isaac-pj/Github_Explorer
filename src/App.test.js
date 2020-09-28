import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Sholud be render", () => {
  const { getByTestId } = render(<App />);
  const app = getByTestId("app");
  expect(app).toBeInTheDocument();
});

describe("Tests for home page", () => {
  afterEach(cleanup);

  test("Should be have a github title", () => {
    const { getByTestId } = render(<App />);
    const github = getByTestId("github");
    expect(github).toBeInTheDocument();
  });

  test("Should be possible search users", async () => {
    const { getByTestId } = render(<App />);

    const form = getByTestId("form-search");
    expect(form).toBeInTheDocument();

    const input = getByTestId("input-search");
    expect(input).toBeInTheDocument();

    const submit = getByTestId("submit-search");
    expect(submit).toBeInTheDocument();

    await waitForElement(() =>
      fireEvent.change(input, { target: { value: "isaac-lima" } })
    );
    expect(input.value).toEqual("isaac-lima");
    expect(input.value === "isaac").toBe(false);

    await waitForElement(() => userEvent.type(input, "isaac-pj"));
    expect(input.value).toEqual("isaac-pj");

    await waitForElement(() => fireEvent.submit(form));
    expect(screen.getByText(/results/i)).toBeInTheDocument();

    const listUsers = await screen.findByLabelText("list-users");
    expect(listUsers).toBeInTheDocument();
    expect(listUsers?.children?.length).toBeGreaterThan(0);
  });

  test("Should be show not found result message", async () => {
    const { getByTestId } = render(<App />);

    const form = getByTestId("form-search");
    expect(form).toBeInTheDocument();

    const input = getByTestId("input-search");
    expect(input).toBeInTheDocument();

    const submit = getByTestId("submit-search");
    expect(submit).toBeInTheDocument();

    await waitForElement(() => userEvent.type(input, "fgsdfgsdsdfg"));
    expect(input.value).toEqual("fgsdfgsdsdfg");

    await waitForElement(() => fireEvent.click(submit));
    const listUsers = await screen.queryByLabelText("list-users");
    expect(listUsers).toBeNull();

    expect(await screen.findByText(/sorry/i)).toBeInTheDocument();
  });

  test("Should be disabled if not typed", async () => {
    const { getByTestId } = render(<App />);

    const form = getByTestId("form-search");
    expect(form).toBeInTheDocument();

    const input = getByTestId("input-search");
    expect(input).toBeInTheDocument();

    const submit = getByTestId("submit-search");
    expect(submit).toBeInTheDocument();

    await waitForElement(() =>
      fireEvent.change(input, { target: { value: "torvalds" } })
    );
    expect(input.value).toEqual("torvalds");

    console.log(input.outerHTML);

    await waitForElement(() => fireEvent.click(submit));
  });
});
