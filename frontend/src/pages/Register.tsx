import { Link } from "@solidjs/router";
import Box from "@suid/material/Box";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import FormControl from "@suid/material/FormControl";
import Input from "@suid/material/Input";
import InputLabel from "@suid/material/InputLabel";
import Typography from "@suid/material/Typography";
import { createSignal } from "solid-js";


export default function Regiser() {
    const [formData, updateForm] = createSignal({
        email: null,
        nickname: null, 
        name: null, 
        surname: null,
        password: null,
        password_repeat: null
    })

    function onChange(event: Event) {
        updateForm({
          ...formData(),
          [(event.target as HTMLTextAreaElement).name]: (event.target as HTMLTextAreaElement).value
        })
      }

    function submit(event: SubmitEvent) {
        event.preventDefault()
        console.log(formData());
        

        fetch(
            '/auth/register',
            {}
        )
    }


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
                <form 
                    onSubmit={submit}
                    style='width: 90%'
                >
                    <FormControl 
                        fullWidth 
                        sx={{
                            mt: '15px'
                    }}>
                        <InputLabel for='email'>Email</InputLabel>
                        <Input id='email' type='email' required onChange={onChange}/>
                    </FormControl>
                    <FormControl 
                        fullWidth 
                        sx={{
                            mt: '15px'
                    }}>
                        <InputLabel for='nickname'>Никнейм</InputLabel>
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
                            <InputLabel for='name'>Имя</InputLabel>
                            <Input id='name' required onChange={onChange}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel for='surname'>Фамилия</InputLabel>
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
                        <InputLabel for='course'>Курс</InputLabel>
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
                        <InputLabel for='password'>Пароль</InputLabel>
                        <Input fullWidth id='password' type='password' required onChange={onChange}/>
                    </FormControl>
                    <FormControl 
                        fullWidth 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'end',
                            mt: '15px'
                    }}>
                        <InputLabel for='password_repeat'>Подтверждение</InputLabel>
                        <Input fullWidth id='password_repeat' type='password' required onChange={onChange}/>
                    </FormControl>
                    <Button fullWidth type='submit' sx={{mt: '10px'}}>Зарегистрироваться</Button>
                </form>
                <Typography>Уже есть аккаунт? <Link href='/login' children={'Войти'}/></Typography>
            </Container>
        </Box>
    )
}