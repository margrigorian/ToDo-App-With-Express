import path from 'path';
import fs from 'fs/promises';

const dataPath = path.resolve('db/db.json');

async function getData() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
}

export async function getExpeditionsOfCurrentUser(userId){
    const data = await getData();
    const usersData = data.expeditions.filter(el => el.userId === userId);
    return usersData; // даже если пустой массив
}

export async function addNewExpedition(userId, title) {
    const data = await getData();
    const newExpedition = {
        id: Date.now(),
        title,
        status: false,
        userId
    }

    data.expeditions.push(newExpedition);
    await fs.writeFile(dataPath, JSON.stringify(data));
    return newExpedition;
}

export async function updateExpedition(body) {
    const data = await getData();
    // проверка наличия такого todo
    const expedition = data.expeditions.find(el => el.id === +body.id);
    // нужно ли у todo проверять userId?

    if(expedition) {
        // обновляем
        data.expeditions.map(el => {
            if(el.id === +body.id) {
                el.title = body.title;
                el.status = body.status;
                return el;
            }else {
                return el;
            }
        })

        await fs.writeFile(dataPath, JSON.stringify(data));
    
        // Или можно сразу возвращать body?
        const updatedExpedition = data.expeditions.find(el => el.id === body.id);
        return updatedExpedition;
    }else {
        return null;
    }
}

export async function deleteExpedition(id) {
    const data = await getData();
    // проверка наличия такого todo
    const expedition = data.expeditions.find(el => el.id === id);
    // нужно ли у todo проверять userId?

    if(expedition) {
        const updatedExpeditions = data.expeditions.filter(el => el.id !== id);
        data.expeditions = updatedExpeditions;
        await fs.writeFile(dataPath, JSON.stringify(data));
        return expedition;
    }else {
        return null;
    }
}