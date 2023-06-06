import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./frontEnd/context/categoriesContext";
import { StoreContextComponent } from "./frontEnd/context/storeContext";
import { AuthContextComponent } from "./frontEnd/context/AuthContext";

import { AddressAndOrdersContextProvider } from "./frontEnd/context/AddressAndOrdersContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoriesProvider>
        <StoreContextComponent>
          <AuthContextComponent>
            <AddressAndOrdersContextProvider>
              <App />
            </AddressAndOrdersContextProvider>
          </AuthContextComponent>
        </StoreContextComponent>
      </CategoriesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
