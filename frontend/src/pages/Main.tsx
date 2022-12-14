import teamLogo from '../assets/teamLogo.png'

import { LoginOutlined, LogoutOutlined, Person } from '@suid/icons-material'
import Container from '@suid/material/Container'
import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import ButtonGroup from '@suid/material/ButtonGroup'
import { createResource, createSignal } from 'solid-js'
import IconButton from '@suid/material/IconButton'
import Dismiss from 'solid-dismiss'
import { getData } from '../utils'

const contentBlockStyles = {
    display: 'block',
    width: '90%',
    height: '520px',
    padding: '20px',
    margin: '20px 0',

    bgcolor: '#E2F6FF',
    borderRadius: '50px'
}


export default function Main() {
    const sessionID = document.cookie.split('; ').find(row => row.startsWith('session='))?.split('=')[1]
    const [menuOpen, setMenuOpen] = createSignal(false)
    const [isAdmin, _] = createResource(async () => (await getData(['is_admin'])).is_admin)  
    let menuBtn: HTMLButtonElement
    
    function onNavBtnClick(event: Event) {
        document
        .getElementById((event.target as HTMLButtonElement).value)
        .scrollIntoView({
            behavior: 'smooth', 
            block: 'center'
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%'
            }}>
                <Box sx={{
                    display: 'flex',
                    height: '175px',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 35px'
                }}>
                    <img src={teamLogo} alt='team' style={{
                        height: '150px'
                    }}/>
                    {
                        Boolean(sessionID) ?
                        <Box 
                            sx={{
                                mr: '25px',
                                display: 'flex',  
                                flexDirection: 'column',
                                alignItems: 'end'
                            }}>
                            <IconButton 
                                ref={menuBtn}
                                sx={{bgcolor: '#BBBBFF', borderRadius: '25px', height: '50px', width: '50px'}} 
                                children={<Person/>}
                            />
                            <Container sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'end'
                            }} 
                            disableGutters>
                                <Dismiss
                                    menuButton={menuBtn}
                                    open={menuOpen}
                                    setOpen={setMenuOpen}
                                >
                                    <Box sx={{
                                        mt: '5px',
                                        bgcolor: '#fff',
                                        boxShadow: '#00000029 0 0 25px',
                                        borderRadius: '15px',
                                        width: '200px',
                                        position: 'absolute',
                                        transform: 'translate(-200px, 0)',
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        alignItems: 'end',
                                        zIndex: 1
                                    }}>
                                        <Button fullWidth onClick={() => window.location.assign('/personal')}>???????????? ??????????????</Button>
                                        {isAdmin() && <Button fullWidth onClick={() => window.location.assign('/admin')}>?????????? ????????????</Button>}
                                        <Button fullWidth sx={{color: '#d32f2f', mt: '5px'}} onClick={() => window.location.assign('/logout')}><LogoutOutlined/>??????????</Button>
                                    </Box>
                                </Dismiss>
                            </Container>
                        </Box>
                        :
                        <Button 
                            size='large'
                            startIcon={<LoginOutlined/>} 
                            sx={{mr: '25px'}}
                            children={'????????'}
                            onClick={() => window.location.assign('/login')}
                        />
                    }
                </Box>
                <ButtonGroup
                    fullWidth
                    orientation='horizontal'
                    sx={{
                        height: '40px',
                        width: '85%'
                    }}
                >
                    <Button value='info' onClick={onNavBtnClick}>????????????????????</Button>
                    <Button value='news' onClick={onNavBtnClick}>??????????????</Button>
                    <Button value='events' onClick={onNavBtnClick}>??????????????????????</Button>
                    <Button value='goods' onClick={onNavBtnClick}>??????????</Button>
                    <Button value='team' onClick={onNavBtnClick}>??????????????</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
            }}>
                <Container 
                    id='info'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    ????????????????????
                </Container>
                <Container 
                    id='news'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    ??????????????
                </Container>
                <Container 
                    id='events'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    ??????????????????????
                </Container>
                <Container 
                    id='goods'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    ??????????
                </Container>
                <Container 
                    id='team'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    ??????????????
                </Container>
            </Box>
        </Box>
    )
}