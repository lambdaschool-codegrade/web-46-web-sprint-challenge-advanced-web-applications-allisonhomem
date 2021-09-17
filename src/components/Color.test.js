import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const blankColor = {
    color: "",
    code: {
      hex: "",
    },
    id: 0,
};

const aliceBlue = {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff",
    },
    id: 1,
};

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={blankColor}/>);
});
  
test("Renders the color passed into component", () => {
    render(<Color color={aliceBlue}/>)
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockToggleEdit = jest.fn();
    const mockDeleteColor = jest.fn();

    render(<Color color={aliceBlue} deleteColor={mockDeleteColor} toggleEdit={mockToggleEdit} />);

    const deleteButton = screen.queryByTestId('delete');

    userEvent.click(deleteButton);
    
    expect(mockDeleteColor).toBeCalled();
    expect(mockToggleEdit).toBeCalled();
    //we know that handleDelete was called, since both of these functions were called, and that only happens inside of the handleDelete function
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockSetEditColor = jest.fn();
    const mockToggleEdit = jest.fn();

    render(<Color color={aliceBlue} setEditColor={mockSetEditColor} toggleEdit={mockToggleEdit}/>)
    
    const colorButton = screen.queryByTestId('color');

    userEvent.click(colorButton);

    expect(mockSetEditColor).toBeCalled();
    expect(mockToggleEdit).toBeCalled();
});