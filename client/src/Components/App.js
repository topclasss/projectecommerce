import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";


const App = () => {
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <p>test</p>
                {/* <Route path="/" element={} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
