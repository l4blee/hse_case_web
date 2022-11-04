import { Link } from "@solidjs/router";
import { Visibility, VisibilityOff } from "@suid/icons-material";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import FormControl from "@suid/material/FormControl";
import IconButton from "@suid/material/IconButton";
import Input from "@suid/material/Input";
import InputLabel from "@suid/material/InputLabel";
import Typography from "@suid/material/Typography";
import { createSignal } from "solid-js";

export default function Login() {
    const [showPwd, setShowPwd] = createSignal(false)

    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '#00000029 0 0 25px',
                padding: '25px',
                borderRadius: '8px',
            }}>
                <Typography sx={{
                    fontSize: '22px',
                    width: '100%',
                    textAlign: 'center'
                }}>
                    Вход
                </Typography>
                <form style='width: 90%'>
                    <FormControl 
                        fullWidth 
                        sx={{
                            mt: '15px'
                    }}>
                        <InputLabel for='email'>Email</InputLabel>
                        <Input id='email'/>
                    </FormControl>
                    <FormControl 
                        fullWidth 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'end',
                            mt: '15px'
                    }}>
                        <InputLabel for='password'>Пароль</InputLabel>
                        <Input fullWidth id='password' type={showPwd() ? 'text' : 'password'}/>
                        <IconButton
                            onClick={() => setShowPwd(!showPwd())}
                            children={showPwd() ?  <VisibilityOff/> : <Visibility/>}
                            size='large'
                            sx={{
                                ml: '5px',
                                width: '25px', 
                                height: '25px'
                            }}
                        />
                    </FormControl>
                    <Button fullWidth type='submit' sx={{mt: '10px'}}>Войти</Button>
                </form>
                <Typography>Ещё нет аккаунта? <Link href='/register' children={'Создать'}/></Typography>
            </Container>
        </Box>
    )
}