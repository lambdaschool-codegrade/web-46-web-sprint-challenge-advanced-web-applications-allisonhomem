import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const emptyColors = [];

const twoColors = [  {
    color: "aqua",
    code: {
      hex: "#00ffff",
    },
    id: 3,
  },
  {
    color: "aquamarine",
    code: {
      hex: "#7fffd4",
    },
    id: 4,
  }];

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={emptyColors}/>)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={twoColors}/>)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const mockEditing1 = true;

    const {rerender} = render(<ColorList colors={twoColors} editing={mockEditing1}/>)

    let EditMenu = screen.queryByTestId('edit_menu');

    expect(EditMenu).toBeInTheDocument();

    const mockEditing2 = false;

    rerender(<ColorList colors={twoColors} editing={mockEditing2}/>);

    expect(EditMenu).not.toBeInTheDocument();
});
