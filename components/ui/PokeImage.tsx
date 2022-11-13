import { Box, CardMedia } from '@mui/material'

export const PokeImage = ({ id, name, img }) => {
  return (
    <Box className='mainpokemons' maxWidth='240px' width='100%' position="absolute" marginBottom="7rem" >
        <CardMedia
            component="img"
            sx={{ width: "100%", filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.5))", objectFit:'fill' }}
            image={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${ id }.png` }
            alt={ name }
        />
    </Box>
  )
}
