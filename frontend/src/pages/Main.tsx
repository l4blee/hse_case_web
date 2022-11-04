import teamLogo from '../assets/teamLogo.png'

import { List, LoginOutlined, LogoutOutlined, Person } from '@suid/icons-material'
import Container from '@suid/material/Container'
import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import ButtonGroup from '@suid/material/ButtonGroup'
import { createSignal } from 'solid-js'
import IconButton from '@suid/material/IconButton'
import Dismiss from 'solid-dismiss'
import ListItemButton from '@suid/material/ListItemButton'

const contentBlockStyles = {
    display: 'block',
    width: '90%',
    height: '650px',
    padding: '20px',
    margin: '20px 0',

    bgcolor: '#E2F6FF',
    borderRadius: '50px'
}


export default function Main() {
    const sessionID = document.cookie.split('; ').find(row => row.startsWith('session='))?.split('=')[1]
    const [nickname, setNickname] = createSignal(null)
    const [menuOpen, setMenuOpen] = createSignal(false)
    let menuBtn: HTMLButtonElement
    
    if (sessionID) {        
        fetch(
            '/api/get_nickname/'
        ) 
        .then(response => response.json())
        .then((data) => {setNickname(data.nickname)})

        console.log(nickname());
        
    }


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
                    height: '200px',
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
                                alignItems: 'end',
                                p: 0
                            }} 
                            disableGutters>
                                <Dismiss
                                    menuButton={menuBtn}
                                    open={menuOpen}
                                    setOpen={setMenuOpen}
                                    overlay
                                >
                                    <Box sx={{
                                        mt: '5px',
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        alignItems: 'end'
                                    }}>
                                        <Button onClick={() => window.location.assign('/personal')}>Личный кабинет</Button>
                                        <Button sx={{color: '#d32f2f', mt: '5px'}} onClick={() => window.location.assign('/logout')}><LogoutOutlined/>Выход</Button>
                                    </Box>
                                </Dismiss>
                            </Container>
                        </Box>
                        :
                        <Button 
                            size='large'
                            startIcon={<LoginOutlined/>} 
                            sx={{mr: '25px'}}
                            children={'Вход'}
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
                    <Button value='info' onClick={onNavBtnClick}>Информация</Button>
                    <Button value='news' onClick={onNavBtnClick}>Новости</Button>
                    <Button value='events' onClick={onNavBtnClick}>Мероприятия</Button>
                    <Button value='goods' onClick={onNavBtnClick}>Товар</Button>
                    <Button value='team' onClick={onNavBtnClick}>Команда</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    mt: '15px'
            }}>
                <Container 
                    id='info'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    Информация
                </Container>
                <Container 
                    id='news'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    Новости
                </Container>
                <Container 
                    id='events'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    Мероприятия
                </Container>
                <Container 
                    id='goods'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    Товар
                </Container>
                <Container 
                    id='team'
                    maxWidth={false}
                    sx={contentBlockStyles}>
                    Команда
                </Container>
            </Box>
        </Box>
    )
}