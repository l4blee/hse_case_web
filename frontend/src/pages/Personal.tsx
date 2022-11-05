import Box from "@suid/material/Box"
import { createResource } from "solid-js"
import { getData, getQR } from "../utils"



export default function Personal() {
    const retrieveInfo = async () => await getData(['nickname', 'email', 'fullname', 'course'])
    const [userData, _] = createResource(retrieveInfo)
    const [qrCode, __] = createResource(getQR)

    return (
        <Box sx={{p: '20px'}}>
            <pre>
                {JSON.stringify(userData(), null, '\t')}
            </pre>
            <img src={qrCode()} alt='QR Code'/>
        </Box>
    )
}