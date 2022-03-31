import { useMediaQuery } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const isDarkModeOnYoutube = document.querySelector('html')?.getAttribute('dark')
const mode = isDarkModeOnYoutube ? 'dark' : 'light'

export const theme = createTheme({
  palette: {
    mode,
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
