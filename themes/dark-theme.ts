import { ThemeProvider, createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#141417'
    },
    info: {
      light: '#E5FFB0',
      main: '#abff00',
      contrastText: '#000',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 60
        },
      }
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '5rem',
          '@media (max-width:768px)': {
            fontSize: '3.05rem',
          },'@media (max-width:425px)': {
            fontSize: '2.5rem',
          },
          
          
        },
        h2: {
          fontSize: '50px',
          fontWeight:'900',
          
          '@media (max-width:768px)': {
            fontSize: '50px',
          },'@media (max-width:425px)': {
            fontSize: '50px',
          },
         
        },
        h3: {
          fontSize: '100px',
          '@media (max-width:600px)': {
            fontSize: '20px',
          },
          
        },
        h4: {
          fontSize: '2.5rem',
          '@media (max-width:600px)': {
            fontSize: '1.9rem',
          },
          
        },
        h5: {
          fontSize: '2rem',
          '@media (max-width:600px)': {
            fontSize: '1.5rem',
          },
         
        },
        h6: {
          fontSize: '1.5rem',
          '@media (max-width:600px)': {
            fontSize: '1.2rem',
          },
        
        },
        subtitle1: {
          fontSize: '20px',
          
          '@media (max-width:900px)': {
            fontSize: '20px',
          },
          '@media (max-width:375px)': {
            fontSize: '20px',
          },
          lineHeight: 'normal'
        },
        body1: {
          fontSize: '1rem',
          '@media (max-width:900px)': {
            fontSize: '0.9rem',
          },
          lineHeight: 'normal'
        },
        body2: {
          
          fontSize: '1rem',
          '@media (max-width:900px)': {
            fontSize: '0.9rem',
            
          },
          lineHeight: 'normal'
        },
    }
  },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          border: "2px solid #141417",
          backgroundColor:'#141417',
          height: 44,
          ":hover": {
            backgroundColor: '#00FE5C',
            transition: 'all 0.3s ease-in-out',
            color: '#000',
            border: "2px solid #141417",
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          color: "#ffff",
        }
      }

    }
    ,

    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 20px rgba(0,0,0,0.05)',
          borderRadius: '22px',
        }
      }
    }
    
  }
});