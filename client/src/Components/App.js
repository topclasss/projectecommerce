import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./reused/GlobalStyles";


const App = () => {
    
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<p>test</p>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
