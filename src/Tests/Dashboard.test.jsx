import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../Components/Dashboard';
import { _getTableData } from '../Utils/Network/TableData';
import '@testing-library/jest-dom';

jest.mock('../../Utils/Network/TableData', () => ({
    _getTableData: jest.fn(),
}));

const mockData = [
    { 's.no': 1, 'percentage.funded': '50%', 'amt.pledged': '$1000' },
    { 's.no': 2, 'percentage.funded': '30%', 'amt.pledged': '$500' },
    { 's.no': 3, 'percentage.funded': '70%', 'amt.pledged': '$1500' },
    { 's.no': 4, 'percentage.funded': '80%', 'amt.pledged': '$2000' },
    { 's.no': 5, 'percentage.funded': '90%', 'amt.pledged': '$2500' },
    { 's.no': 6, 'percentage.funded': '40%', 'amt.pledged': '$800' },
];

describe('Dashboard Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', async () => {
        _getTableData.mockResolvedValueOnce([]);
        render(<Dashboard />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
        await waitFor(() => expect(_getTableData).toHaveBeenCalledTimes(1));
    });

    test('renders table data correctly after API call', async () => {
        _getTableData.mockResolvedValueOnce(mockData);
        render(<Dashboard />);
        await waitFor(() => expect(screen.getByText('Saas Labs Assignment')).toBeInTheDocument());
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('50%')).toBeInTheDocument();
        expect(screen.getByText('$1000')).toBeInTheDocument();
    });

    test('renders correct page navigation text', async () => {
        _getTableData.mockResolvedValueOnce(mockData);
        render(<Dashboard />);
        await waitFor(() => expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument());
    });

    test('navigates to the next page', async () => {
        _getTableData.mockResolvedValueOnce(mockData);
        render(<Dashboard />);
        await waitFor(() => expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument());

        const rightArrow = screen.getByRole('img', { name: /rightArrow/i });
        fireEvent.click(rightArrow);
        await waitFor(() => expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument());
    });

    test('navigates to the previous page', async () => {
        _getTableData.mockResolvedValueOnce(mockData);
        render(<Dashboard />);
        await waitFor(() => expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument());

        const rightArrow = screen.getByRole('img', { name: /rightArrow/i });
        fireEvent.click(rightArrow);
        await waitFor(() => expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument());

        const leftArrow = screen.getByRole('img', { name: /leftArrow/i });
        fireEvent.click(leftArrow);
        await waitFor(() => expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument());
    });

    test('disables navigation buttons on boundary pages', async () => {
        _getTableData.mockResolvedValueOnce(mockData);
        render(<Dashboard />);
        await waitFor(() => expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument());

        const leftArrow = screen.getByRole('img', { name: /leftArrow/i });
        expect(leftArrow).toHaveClass('button-hover'); 

        const rightArrow = screen.getByRole('img', { name: /rightArrow/i });
        fireEvent.click(rightArrow);
        await waitFor(() => expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument());
        expect(rightArrow).toHaveClass('button-hover'); 
    });
});
