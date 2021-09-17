import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';
import mockFetchColorService from '../services/fetchColorService.js';
jest.mock('../services/fetchColorService.js')

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

test("Renders appropriate number of colors passed in through mock", async() => {
    mockFetchColorService.mockResolvedValueOnce({data: twoColors});
    
    render(<BubblePage/>);

    const colors = await screen.findAllByTestId('color');

    expect(colors).toHaveLength(2);
});