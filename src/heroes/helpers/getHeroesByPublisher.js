import { heroes } from "../data/heroes";

export const getHeroesByPublisher=(publiser)=>{
    const validPublishers=['DC Comics','Marvel Comics']

    if (!validPublishers.includes(publiser))
    {
        throw new Error(`${publiser} is not a valid publisher`)
    }

    return heroes.filter(heroe=> heroe.publisher===publiser);
}