import App from "./App";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';

test("renders App component", () => {
    render(<App />);
    const header = screen.getByText(/My Todolist/i);
    expect(header).toBeInTheDocument();
});

test("add todo", () => {
    render(<App />);

    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Go to coffee" } });

    const date = screen.getByPlaceholderText("Date");
    fireEvent.change(date, { target: { value: "29.01.2023" } });

    const button = screen.getByText("Add");
    fireEvent.click(button);

    const table = screen.getByRole("table");
    expect(table).toHaveTextContent(/go to coffee/i);
});

test("clear todos", () => {
    render(<App />);

    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Go shop for groceries" } })

    const date = screen.getByPlaceholderText("Date");
    fireEvent.change(date, { target: { value: "10.10.2024 " } });

    const button = screen.getByText("Add");
    fireEvent.click(button);

    fireEvent.change(desc, { target: { value: "Buy bananas" } })
    fireEvent.change(date, { target: { value: "10.10.2024 " } });
    fireEvent.click(button);

    const table = screen.getByRole("table");
    expect(table).toHaveTextContent(/go shop for groceries/i)
    expect(table).toHaveTextContent(/buy bananas/i);

    const clear = screen.getByText("Clear");
    fireEvent.click(clear);

    expect(table).not.toHaveTextContent(/go shop for groceries/i)
    expect(table).not.toHaveTextContent(/buy bananas/i);
});