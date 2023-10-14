import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const exampleShowData = {
    name: "Example Show",
    summary: "This is an example show summary.",
    seasons: [
      {
        id: 1,
        name: "Season 1",
        episodes: []
      },
      {
        id: 2,
        name: "Season 2",
        episodes: []
      }
    ]
  };
  
  test('renders without errors', () => {
    render(<Show show={exampleShowData} selectedSeason="none" />);
    expect(screen.getByText(/Example Show/)).toBeInTheDocument();
  });
  

  test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });  
  

  test('renders same number of options seasons are passed in', () => {
    render(<Show show={exampleShowData} selectedSeason="none" />);
    const seasonOptions = screen.getAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(exampleShowData.seasons.length);
  });
  
  test('handleSelect is called when a season is selected', () => {
    const mockHandleSelect = jest.fn();
    render(<Show show={exampleShowData} selectedSeason="none" handleSelect={mockHandleSelect} />);
    
    fireEvent.change(screen.getByLabelText(/Select A Season/), { target: { value: "1" } });
    expect(mockHandleSelect).toHaveBeenCalledTimes(1);
  });
  
  test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={exampleShowData} selectedSeason="none" />);
    expect(screen.queryByTestId("episodes-container")).not.toBeInTheDocument();
  
    rerender(<Show show={exampleShowData} selectedSeason="0" />);
    expect(screen.getByTestId("episodes-container")).toBeInTheDocument();
  });
  