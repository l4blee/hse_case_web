const a=async t=>await fetch("/api/get_data/",{method:"POST",body:JSON.stringify({requested:t}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()),n=async()=>URL.createObjectURL(await fetch("/api/get_qr/").then(t=>t.blob()));export{n as a,a as g};