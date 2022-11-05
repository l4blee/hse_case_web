const getData = async (data:  Array<string>) => {
    return await fetch(
        '/api/get_data/',
        {
            method: 'POST',
            body: JSON.stringify({requested: data}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ) 
    .then(response => response.json())
}

const getQR = async () => {
    return URL.createObjectURL(
        await fetch('/api/get_qr/')
              .then(data => data.blob())
    )
}

export {getData, getQR}
