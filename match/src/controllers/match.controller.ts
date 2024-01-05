import axios, { AxiosResponse } from 'axios';

interface Creature {
    name: string;
    attack: number;
    defense: number;
    stamina: number;
    price: number;
}
function createCreature(name: string, attack: number, defense: number, stamina: number,price: number): Creature {
    return {
        name,
        attack,
        defense,
        stamina,
        price
    };
}
const Utopia = createCreature("Utopia",10,4,7,10)
const Shadowstrike = createCreature("Shadowstrike",11,3,2,7)
const Thunderclaw = createCreature("Thunderclaw",10,4,7,8)
const Blaze = createCreature("Blaze",20,4,7,20)
const Gardien = createCreature("Gardien",10,4,7,10)
const Serpent = createCreature("Serpent",10,4,7,8)
const ListCreatures = [Utopia,Shadowstrike,Thunderclaw,Blaze,Gardien,Serpent]
function calculateScore(creature: Creature): number {
    return creature.attack ** 2 + creature.defense * creature.stamina;
}

function playRound(playerCreature: Creature, botCreatures: Creature[]): Creature {
    let winningCreature = botCreatures[0]; // Assuming the first bot initially wins
    console.log(playerCreature)
    const playerScore = calculateScore(playerCreature);

    // Calculate scores for each bot and find the highest scoring bot
    let highestBotScore = calculateScore(botCreatures[0]);
    for (let i = 1; i < botCreatures.length; i++) {
        const botScore = calculateScore(botCreatures[i]);
        if (botScore > highestBotScore) {
            highestBotScore = botScore;
            winningCreature = botCreatures[i];
        }
    }

    // Compare player's score with the highest scoring bot
    if (playerScore > highestBotScore) {
        winningCreature = playerCreature;
    }

    return winningCreature;
}
function getRandomElement<T>(list: T[]): T {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function getCreatureByName(name: string): Creature | null {
    const foundCreature = ListCreatures.find(creature => creature.name === name);
    return foundCreature || null;
}

async function playMatch(req: any, res: any) {
    console.log(ListCreatures)
    const {cr1, cr2, cr3,cr4,cr5} = req.body;
    if (!cr1 || !cr2 || !cr3 || !cr4 || !cr5) {
        return res.status(400).json({ message: '5 Creatures are required' });
        }
    const { db } = req.app
    const playerCreature = [getCreatureByName(cr1),getCreatureByName(cr2),getCreatureByName(cr3),getCreatureByName(cr4),getCreatureByName(cr5)]
    console.log(playerCreature)
    var match ={}
    match['date']=Date()
    const rounds = 5;
    let playerWins = 0;

    for (let i = 1; i <=rounds; i++) {
        const roundWinner = playRound(playerCreature[i-1], [getRandomElement(ListCreatures),getRandomElement(ListCreatures),getRandomElement(ListCreatures),getRandomElement(ListCreatures)]);
        let round = "round" + i;
        match[round]={}
         if(roundWinner == playerCreature[i]){
            match[round]["winner"] = "Aymane"
         }
         else{
            match[round]["winner"] = "Bots"
         }
         match[round]['Creature']=roundWinner
        // Check if the player won the round
        if (roundWinner === playerCreature[i]) {
            playerWins++;
            addCoins()
        }
    }
    if(playerWins >= 3){
        match["result"] = "Win"
        addCoins()
    }
    else{
        match["result"] = "defeat"
    }
    const result = await db.collection('match').insertOne(match);
      if (result.acknowledged) {
        res.status(200).json({ message: 'match played' });
      } else {
        throw new Error('match not played');
      }
}

function addCoins(){
    axios.post('http://localhost:3001/player/add_coins', {})
    .then((response: AxiosResponse) => {
        console.log('Creature created:', response.data);
    })
    .catch((error: any) => {
        console.error('Error creating creature:', error);
    });
}

async function getAllMatches(req: any, res: any){
    const { db } = req.app
   const result = await db.collection('match').find({}).toArray()
   console.log(result)
   return res.status(200).json(result)
}

async function getLastMatches(req: any, res: any){
    const { db } = req.app
   const result = await db.collection('match').find({}).sort({ _id: -1 }).limit(1).toArray();
   console.log(typeof result)
   return res.status(200).json(result)
}

export{playMatch,getAllMatches,getLastMatches}