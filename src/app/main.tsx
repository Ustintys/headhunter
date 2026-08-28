import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme.ts";
import './styles/normalize.scss';
import './styles/index.scss';
import "@fontsource/open-sans";
import "@fontsource/inter";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
