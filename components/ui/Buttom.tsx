import IconButton from '@mui/material/IconButton/IconButton'

export const Buttom = ({ onClick, pokemonsApi, icon, value }) => {
  return (
      <IconButton disabled={ pokemonsApi > value ? false : true } onClick={ onClick } aria-label="back" size="large" sx={{ backgroundColor: '#ffffff29' }}>
          { icon }
      </IconButton>
  )
}
