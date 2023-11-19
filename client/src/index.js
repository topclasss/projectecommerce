import ReactDOM from 'react-dom/client';
import { ProductsProvider } from './Components/routes/StorePage/ProductsProvider';

import App from './Components/App';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(  <ProductsProvider> <App /> </ProductsProvider> );