import { save } from 'save-file'

// common math functions, grow into this
function mathProc(typ, val) {
    switch (typ) {
        default:
            console.log(`it's mathproc: typ = ${typ} and val = '${val}'`)
            break;
    }
} 

async function saveFile(a,b) {  // The save button on B1.js, e.g
    try {
        const msg = "Press OK to create new local file: " + b
        if (window.confirm(msg)) {
            await save(a,b)
        }
    } catch (err) {
        console.error("Error in function saveFile().")
        alert(err)
    }
}

const commonUtils = {
    saveFile,
    mathProc
}

export default commonUtils