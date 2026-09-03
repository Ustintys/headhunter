import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme.ts";
import {Provider} from "react-redux";
import {store} from "../store/store.ts";
//--------------------------------------------------------
import './styles/normalize.scss';
import './styles/index.scss';
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@mantine/core/styles.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>,
)
