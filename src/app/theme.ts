import { createTheme } from '@mantine/core';

export const theme = createTheme({

  colors: {
    indigo: [
      '#EEF2FF', // 0 — Ultra Light
      '#E5E9FF', // 1
      '#C9D2FF', // 2
      '#AAB9FF', // 3
      '#8EA2FF', // 4
      '#6F89F8', // 5
      '#4263EB', // 6 — Primary
      '#3D5BD9', // 7
      '#364FC7', // 8 — Dark Primary
      '#2F44A8', // 9
    ],
  },

  primaryColor: 'indigo',
  primaryShade: 6,

  black: '#0F0F10',
  white: '#FFFFFF',

  fontFamily: '"Open Sans", sans-serif',

  other: {

    background: '#F6F6F7',

    gray: 'rgba(15, 15, 16, 0.5)',
    lightGray: 'rgba(15, 15, 16, 0.3)',
    preLight: 'rgba(15, 15, 16, 0.2)',
    ultraLight: 'rgba(15, 15, 16, 0.1)',
  },
});