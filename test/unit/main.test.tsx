import React from 'react';
import { it , expect } from '@jest/globals'
import { render, screen, within } from '@testing-library/react';
import { Application } from '../../src/client/Application';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from '../../src/client/store';
import { ExampleApi, CartApi } from '../../src/client/api';
const basename = '/hw/store';
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);
it('Общие требования', () => {
    const { container } = render(<BrowserRouter basename={basename}>
        <Provider store={store}>
            <Application />
        </Provider>
    </BrowserRouter>);
        

    screen.logTestingPlaygroundURL(container);
    const navItems = Array.from(container.querySelectorAll('.nav-link')).map(el => el.textContent);
    const navItemsTest = ["Catalog", "Delivery", "Contacts", "Cart"];
    expect(navItems).toEqual(navItemsTest);
    expect(container.querySelector('.navbar-brand').tagName.toLowerCase()).toBe('a');
    expect(container.querySelector('.navbar-brand').getAttribute('href')).toBe('/hw/store/');
}); 