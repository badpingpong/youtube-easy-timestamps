import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#008080',
    },
  },
  typography: {
    fontSize: 18,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          fontSize: 14,
        },
      },
    },
    MuiIcon: {
      defaultProps: {
        sx: { fontSize: '24px' },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'large',
      },
    },
  },
})

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}
