import classes from './Main.module.scss'

import nstuLogo from '../../assets/NSTU_logo.png'


export default function Main() {
    return (
        <div class={classes.Root}>
            <header class={classes.Header}>
                <img class={classes.Logo} src={nstuLogo} alt='NSTU'/>
                <h1>Коворкинг</h1>
            </header>
            <div class={classes.Container}>
                <div class={classes.Info}>
                    
                </div>  
            </div>
        </div>
    )
}