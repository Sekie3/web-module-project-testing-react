import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import fetchShow from '../../api/fetchShow';

jest.mock('../../api/fetchShow');

const mockShowData = {
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

test('renders without errors with no props', async () => {
  render(<Display />);
  expect(screen.getByAltText("header image")).toBeInTheDocument();
});

test('renders Show component when the button is clicked ', async () => {
  fetchShow.mockResolvedValueOnce(mockShowData);
  render(<Display />);
  fireEvent.click(screen.getByText("Press to Get Show Data"));
  await waitFor(() => {
    expect(screen.getByTestId("show-container")).toBeInTheDocument();
  });
});

test('renders show season options matching your data when the button is clicked', async () => {
  fetchShow.mockResolvedValueOnce(mockShowData);
  render(<Display />);
  fireEvent.click(screen.getByText("Press to Get Show Data"));
  await waitFor(() => {
    expect(screen.getAllByTestId("season-option").length).toBe(mockShowData.seasons.length);
  });
});

test('calls displayFunc prop when the fetch button is pressed', async () => {
  const mockDisplayFunc = jest.fn();
  fetchShow.mockResolvedValueOnce(mockShowData);
  render(<Display displayFunc={mockDisplayFunc} />);
  fireEvent.click(screen.getByText("Press to Get Show Data"));
  await waitFor(() => {
    expect(mockDisplayFunc).toHaveBeenCalled();
  });
});
