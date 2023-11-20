import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import store from './redux/store.js';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals.js';
import CollectionPage from './pages/collection/collection.component';
import SignInPage from './pages/sign-in/sign-in-page.component';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		children: [
			{
				path: 'collections/:collectionName',
				element: <CollectionPage />,
			},
		],
	},
	{
		path: '/signin',
		element: <SignInPage />,
	},
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
