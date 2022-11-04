import { Link } from "@solidjs/router";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import FormControl from "@suid/material/FormControl";
import FormHelperText from "@suid/material/FormHelperText";
import Input from "@suid/material/Input";
import InputLabel from "@suid/material/InputLabel";
import Typography from "@suid/material/Typography";
import { createSignal, onMount } from "solid-js";


export default function Regiser() {
    const [pwdsError, setPwdsError] = createSignal(false)
    const [headerError, setHeaderError] = createSignal({
        status: false,
        message: ''
    })

    const [formData, updateForm] = createSignal({
        email: null,
        nickname: null, 
        name: null, 
        surname: null,
        course: null,
        password: null,
        password_repeat: null,
    })

    function onChange(event: Event) {
        updateForm({
          ...formData(),
          [(event.target as HTMLElement).id]: (event.target as HTMLTextAreaElement).value
        })
    }

    function submit(event: SubmitEvent) {
        event.preventDefault()
        
        if (formData().password !== formData().password_repeat) {
            setPwdsError(true)
            return
        }

        const data = formData()
        const modifiedData = {
            email: data.email,
            nickname: data.nickname, 
            fullname: [data.name, data.surname],
            password: data.password,
            course: data.course
        }

        fetch(
            '/auth/register',
            {
                method: 'POST',
                body: JSON.stringify(modifiedData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            if (response.status === 409) {
                setHeaderError({
                    status: true, 
                    message: 'Пользователь с этой почтой уже существует!'
                })
                return
            } 
            if (response.status !== 200) {
                setHeaderError({
                    status: true, 
                    message: 'Произошла ошибка, попробуйте позже.'
                })
                return
            }
            
            if (response.redirected) {
                window.location.assign(response.url)
            }
        })
        .catch((_) => {
            setHeaderError({
                status: true, 
                message: 'Произошла ошибка, попробуйте позже.'
            })
            return
        })
    }

    onMount(() => {
        document.title = 'TimeSim | Регистрация'
    })

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
                    Регистрация
                </Typography>
                {headerError().status && <Typography sx={{color: '#d32f2f', textAlign: 'center'}}>{headerError().message}</Typography>}
                <form 
                    onSubmit={submit}
                    style='width: 90%'
                >
                    <FormControl 
                        fullWidth 
                        sx={{
                            mt: '15px'
                    }}>
                        <InputLabel for='email' required>Email</InputLabel>
                        <Input id='email' type='email' required onChange={onChange}/>
                    </FormControl>
                    <FormControl 
                        fullWidth 
                        sx={{
                            mt: '15px'
                    }}>
                        <InputLabel for='nickname' required>Никнейм</InputLabel>
                        <Input id='nickname' required onChange={onChange}/>
                    </FormControl>
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: '15px',
                            padding: '0 !important'
                    }}>
                        <FormControl 
                            fullWidth 
                            sx={{
                                mr: '10px'
                        }}>
                            <InputLabel for='name' required>Имя</InputLabel>
                            <Input id='name' required onChange={onChange}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel for='surname' required>Фамилия</InputLabel>
                            <Input id='surname' required onChange={onChange}/>
                        </FormControl>
                    </Container>
                    <FormControl 
                        fullWidth 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'end',
                            mt: '15px'
                    }}>
                        <InputLabel for='course' required>Курс</InputLabel>
                        <Input fullWidth id='course' required onChange={onChange}/>
                    </FormControl>
                    <FormControl 
                        fullWidth 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'end',
                            mt: '15px'
                    }}>
                        <InputLabel for='password' required>Пароль</InputLabel>
                        <Input fullWidth id='password' type='password' required onChange={onChange}/>
                    </FormControl>
                    <FormControl 
                        fullWidth 
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'end',
                            mt: '15px'
                    }}>
                        <InputLabel for='password_repeat' required>Подтверждение</InputLabel>
                        <Input 
                            fullWidth 
                            id='password_repeat' 
                            type='password' 
                            required 
                            onChange={(event) => {onChange(event); setPwdsError(false)}}/>
                        {pwdsError() && <FormHelperText error>Пароли не совпадают</FormHelperText>}
                    </FormControl>
                    <Button fullWidth type='submit' sx={{mt: '10px'}}>Зарегистрироваться</Button>
                </form>
                <Typography sx={{
                    mt: '5px'
                }}>
                    Уже есть аккаунт? 
                    <Link href='/login' children={'Войти'}/>
                </Typography>
            </Container>
        </Box>
    )
}