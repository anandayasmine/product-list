import type { AppProps } from 'next/app'
import '@/app/assets/styles/index.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { idID } from '@mui/material/locale';
import App from 'next/app';

const theme = createTheme(
  {
    palette: {
      // primary: { main: getComputedStyle(document?.querySelector(':root')).getPropertyValue('--color-primary') },
      primary: { main: '#262c64'},
      secondary: { main: '#222542' },
    },
  },
  idID,
)

class index extends App<AppProps> {

  componentDidMount(): void {


  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default index
