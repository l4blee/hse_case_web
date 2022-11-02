import classes from './Main.module.scss'

import nstuLogo from '../../assets/NSTULogo.png'
import teamLogo from '../../assets/teamLogo.png'


export default function Main() {
    return (
        <div class={classes.Root}>
            <header class={classes.Header}>
                {/* <img class={classes.Logo} src={nstuLogo} alt='NSTU'/> */}
                
                {/* <h1>Коворкинг</h1> */}
            </header>
            <main class={classes.Body}>
                <img class={classes.Team} src={teamLogo} alt='team'/>
                <div class={classes.Container}>
                    <div class={classes.block}>
                        213
                    </div>
                    <div class={classes.block}>
                        213
                    </div>
                    <div class={classes.block}>
                        213
                    </div>
                </div>  
            </main>
        </div>
    )
}