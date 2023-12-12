import axios, { AxiosResponse } from 'axios';


async function createUser(req, res) {
try{
const url = "http://localhost:3000/authentification/createUser"; // Replace with your endpoint URL
const data = req.body; // Replace with your data

axios.post(url, data).then((response: AxiosResponse) => {
})
.catch((error: any) => {
console.error('Error adding user:', error);
return res.status(200).json({ message: 'Error adding the user' });

})
return res.status(200).json({ message: 'User added' });
}
catch(err){
    return res.status(200).json({ message: 'User Already Exit' });
}
}

async function login(req, res) {
const url = "http://localhost:3000/authentification/login"; // Replace with your endpoint URL
const data = req.body; // Replace with your data

axios.post(url, data).then((response: AxiosResponse) => {
})
.catch((error: any) => {
return res.status(400).json({ message: 'Error loging the user' });

})
return res.status(200).json({ message: 'User authentified' });
}

async function playMatch(req, res) {
    const url = "http://localhost:3005/match/playMatch"; // Replace with your endpoint URL
    const data = req.body; // Replace with your data
    
    axios.post(url, data).then((response: AxiosResponse) => {
    })
    .catch((error: any) => {
    return res.status(400).json({ message: 'Error loging the user' });
    
    })
    return res.status(200).json({ message: 'Match played' });
    }

    async function showResult(req, res) {
        const respone = await axios.get("http://localhost:3005/match/getResults")
        console.log(respone.data)
        return res.status(200).json(respone.data);
        }

    async function showAllResult(req, res) {
        const respone = await axios.get("http://localhost:3005/match/getResults")
        console.log(respone.data)
        return res.status(200).json(respone.data);
        }

export{createUser, login,showResult,playMatch,showAllResult}