import Box from "@suid/material/Box"
import { createResource } from "solid-js"

const getData = async () => {
    return await fetch(
        '/api/get_data/',
        {
            method: 'POST',
            body: JSON.stringify({requested: ['fullname', 'email', 'nickname', 'course']}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ) 
    .then(response => response.json())
}

export default function Personal() {
    const [userData, _] = createResource(getData)

    return (
        <Box sx={{p: '20px'}}>
            <pre>
                {JSON.stringify(userData(), null, '\t')}
            </pre>
        </Box>
    )
}