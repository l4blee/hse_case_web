import teamLogo from '../assets/teamLogo.png'

import { createSignal } from 'solid-js'

import { LoginOutlined } from '@suid/icons-material'
import Container from '@suid/material/Container'
import Box from '@suid/material/Box'
import ToggleButtonGroup from '@suid/material/ToggleButtonGroup'
import ToggleButton from '@suid/material/ToggleButton'
import IconButton from '@suid/material/IconButton'


export default function Main() {
    const [selected, setSelected] = createSignal('info')

    return (
        <div style={{
            display: 'flex',
            "flex-direction": 'column',
            width: '100vw',
            height: '100vh'
        }}>
            <Box sx={{
                display: 'flex',
                height: '200px',
                width: '100%',
                alignItems: 'center',
                padding: '0 20px',
                justifyContent: 'space-between'
            }}>
                <img src={teamLogo} alt='team' style={{
                    height: '150px'
                }}/>
                <IconButton 
                    children={<LoginOutlined/>} 
                    onClick={() => window.location.assign('/login')}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                marginTop: '15px',
                padding: '0 20px'
            }}>
                <ToggleButtonGroup
                    fullWidth
                    orientation='horizontal'
                    sx={{
                        height: '40px',
                        width: '85%'
                    }}
                    value={selected()}
                    exclusive
                    onChange={(_, value) => {setSelected(value)}}
                >
                    <ToggleButton value='info'>Информация</ToggleButton>
                    <ToggleButton value='news'>Новости</ToggleButton>
                    <ToggleButton value='events'>Мероприятия</ToggleButton>
                    <ToggleButton value='goods'>Товар</ToggleButton>
                    <ToggleButton value='team'>Команда</ToggleButton>
                </ToggleButtonGroup>
                <Container 
                    maxWidth={false}
                    sx={{
                        width: '90%',
                        height: '90%',
                        padding: '20px',
                        margin: '20px 0',

                        // bgcolor: '#B7DEFA',
                        bgcolor: '#E2F6FF',
                        borderRadius: '50px'
                }}>
                    {selected()}
                </Container>
            </Box>
        </div>
    )
}