import localStorage from 'node-localstorage';
const sessionStorage = localStorage.sessionStorage;

export {verifyPlayer}

async function verifyPlayer(){
     const storedSessionData = JSON.parse(sessionStorage.getItem('sessionData'));
     return storedSessionData 

}
  