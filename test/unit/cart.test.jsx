import React from 'react';
import { createStore } from 'redux';
import { render, events, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Catalog } from './../../src/client/pages/Catalog';
import '@testing-library/jest-dom'
import { Application } from './../../src/client/Application';
import '@testing-library/jest-dom/extend-expect';
const basename = '/hw/store';
it('Каталог', () => {
    const initialState = {
        cart: {
            0:{ id: 0, name: "Gorgeous Soap", price: 711, count: 25 },
            1:{ id: 1, name: "Tasty Pants", price: 917, count: 12 },
        }
    }
    const store = createStore(() => initialState);
    render(
        <MemoryRouter initialEntries={['/cart']}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );
    expect(screen.getByText('Gorgeous Soap')).toBeInTheDocument()
    expect(screen.getByText('$711')).toBeInTheDocument()
    expect(screen.getByText('Tasty Pants')).toBeInTheDocument()
    expect(screen.getByText('$917')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Clear shopping cart')).toBeInTheDocument()
    expect(screen.getByText('Cart (' + Object.keys(initialState.cart).length +')')).toBeInTheDocument();
    events.click(screen.getAllByRole('button')[1])
    expect(screen.getByText('Gorgeous Soap')).notToBeInTheDocument()
});