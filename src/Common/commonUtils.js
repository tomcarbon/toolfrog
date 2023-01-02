import { save } from 'save-file';

async function saveFile(a,b) {
    try {
        const msg = "Press OK to create new local file: " + b;
        if (window.confirm(msg)) {
            await save(a,b);
        }
    } catch (err) {
        alert(err);
    }
}

export default saveFile;