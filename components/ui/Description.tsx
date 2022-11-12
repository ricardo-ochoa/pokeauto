import { Box, Typography } from '@mui/material'


export const Description = ({ name, id, selectedValue, pokemonsApi }) => {
  return (
    <Box width='100%'  marginTop='0rem' sx={{ marginBottom:{xs:'12px', sm:"12px", md:'12px'} }} >
                                    
        <Typography className='animate__animated animate__pulse animate__delay-500s' variant='h2'
        component='h1' textAlign='center' sx={{ textTransform:'capitalize' }} >{ name }</Typography>

        <Box display='flex' justifyContent='center' alignItems='center' width='100%' marginTop='6px'> 
            <Typography variant='subtitle1'  textAlign='center'  marginRight={1}>ID:</Typography>
            <Typography variant='h6'  textAlign='center' fontWeight={800} marginRight={1}>{ id }</Typography>
            <Typography variant='subtitle2'  textAlign='center'  marginRight={1}>/</Typography>
            <Typography variant='subtitle2'  textAlign='center'>All { selectedValue } pokemons: { pokemonsApi as any }</Typography>
        </Box>
            
    </Box>
  )
}
