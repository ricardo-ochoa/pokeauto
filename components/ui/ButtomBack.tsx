import IconButton from '@mui/material/IconButton/IconButton'

export const ButtomBack = ({ onClick, pokemonsApi, icon, value }) => {
  return (
      <IconButton disabled={ value > 0 ? false : true } onClick={ onClick } aria-label="back" size="large" sx={{ backgroundColor: '#ffffff29' }}>
          { icon }
      </IconButton>
  )
}
