import Box from "@suid/material/Box"
import Container from "@suid/material/Container"
import Typography from "@suid/material/Typography"
import { createResource } from "solid-js"
import { getData, getQR } from "../utils"
import qrBg from '../assets/qrBg.png'
import { AttachMoney } from "@suid/icons-material"



export default function Personal() {
    const retrieveInfo = async () => await getData(['nickname', 'email', 'fullname', 'course', 'coins'])
    const [userData, _] = createResource(retrieveInfo)
    const [qrCode, __] = createResource(getQR)

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw'
        }}>
            <Typography 
                sx={{
                    color: '#396CE8',
                    fontSize: '60px',
                    mt: '20px'
            }}>
                Личный кабинет
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '20px'
            }}>
                <Container
                    disableGutters
                    sx={{
                        m: 0,
                        
                        bgcolor: '#CAEEFE',
                        width: '400px',
                        height: '400px',
                        p: '15px',
                        borderRadius: '20px'
                    }}
                >   
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{color: '#396CE8', fontSize: '25px', textAlign: 'center'}} children={userData() && userData().nickname}/>
                        <Box 
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '40px', 
                                width: 'fit-content', 
                                bgcolor: '#396CE833',
                                ml: '10px', 
                                borderRadius: '20px',
                                p: '5px'
                        }}>
                            <AttachMoney/>
                            <Typography sx={{fontSize: '20px', mr: '5px'}} children={userData() && userData().coins}/>
                        </Box>
                    </Box>
                    <Box sx={{mt: '10px'}}>
                        <Typography sx={{display: 'flex', flexDirection: 'row'}}>
                            <Typography children={'Пользователь:'} sx={{color: '#396CE8', mr: '5px'}}/>
                            <Typography children={userData() && userData().fullname.join(' ')}/>
                        </Typography>
                        <Typography sx={{display: 'flex', flexDirection: 'row'}}>
                            <Typography children={'Почта:'} sx={{color: '#396CE8', mr: '5px'}}/>
                            <Typography children={userData() && userData().email}/>
                        </Typography>
                    </Box>
                </Container>
                <Box>
                    <Box component='img' src={qrBg} width='400px'/>
                    <Box sx={{ml: '15px', position: 'absolute', transform: 'translate(-315px, 100px)', borderRadius: '10px'}} component='img' width='200px' src={qrCode()}/>
                </Box>
            </Box>
        </Box>
    )
}