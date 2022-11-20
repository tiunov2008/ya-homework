import React from 'react';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Catalog } from './../../src/client/pages/Catalog';
import '@testing-library/jest-dom'
import { Application } from './../../src/client/Application';
import events from '@testing-library/user-event';
const basename = '/hw/store';
it('Каталог', () => {
    const initialState = {
        products: [
            { id: 0, name: "Gorgeous Soap", price: 711 },
            { id: 1, name: "Tasty Pants", price: 917 },
        ],
        cart: {}
    }
    const store = createStore(() => initialState);
    render(<BrowserRouter basename={basename}>
        <Provider store={store}>
            <Catalog />
        </Provider>
    </BrowserRouter>);
    const cardLinks = Array.from(screen.getAllByText('Details')).map(el => el.textContent);
    expect(screen.getByText('Gorgeous Soap')).toBeInTheDocument()
    expect(screen.getByText('$711')).toBeInTheDocument()
    expect(screen.getByText('Tasty Pants')).toBeInTheDocument()
    expect(screen.getByText('$917')).toBeInTheDocument()
    expect(cardLinks.length).toBe(2);
    let i = 0;
    Array.from(screen.getAllByText('Details')).map(el => {expect(el.getAttribute('href')).toBe('/hw/store/catalog/' + i);i++});
});
it('Cтранице с подробной информацией товара', () => {
    const initialState = {
        cart: {
            0: {
                id: 0,
                name: "Gorgeous Soap",
                price: 711,
                description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                material: "Wooden",
                color: "Cyan",
                count: 3
            }
        },
        details: {
            0: {
                id: 0,
                name: "Gorgeous Soap",
                price: 711,
                description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                material: "Wooden",
                color: "Cyan",
                count: 3
            }
        }
    }
    const store = createStore(() => initialState);
    render(<MemoryRouter  initialEntries={['/catalog/0']}>
        <Provider store={store}>
            <Application />
        </Provider>
    </MemoryRouter >);
    expect(screen.getByText('Gorgeous Soap')).toBeInTheDocument()
    expect(screen.getByText('$711')).toBeInTheDocument()
    expect(screen.getByText('The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive')).toBeInTheDocument()
    expect(screen.getByText('Wooden')).toBeInTheDocument()
    expect(screen.getByText('Cyan')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
    expect(initialState.details[0]).toStrictEqual(initialState.cart[0])
    expect(screen.getByText('Item in cart')).toBeInTheDocument()
    events.click(screen.queryAllByRole('button')[1])
});