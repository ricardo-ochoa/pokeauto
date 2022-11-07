import { ThemeProvider } from '@mui/material'
import { darkTheme } from '../themes'
import CssBaseline from '@mui/material/CssBaseline';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider theme={ darkTheme }>
            <CssBaseline />
            <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
