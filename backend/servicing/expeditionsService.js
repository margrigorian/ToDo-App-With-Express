import path from 'path';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
import { secret } from '../lib/config.js';

const dataPath = path.resolve('db/db.json');

async function getData() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
}

export async function checkToken(token) {
    try{
        const data = await getData();
        const decodedToken = jwt.verify(token, secret); // при ошибке пробрасывает throw
        const userId = data.users[decodedToken.id].id; // в случае ошибки будет undefined

        if(userId || userId === 0) { // пользователь найден
            return userId;
        }else {
            return null;
        }
    }catch(err) {
        // console.log(err);
        return null; // в случае ошибки jwt.verify
    }
}

export async function getExpeditions(page, limit) {
    const data = await getData();
    let responseObj = {
        allExpeditions: data.expeditions,
        limitExpeditions: null 
    }

    if(page && limit) {
        const maxIndex = page * limit;
        const minIndex = maxIndex - limit;
        const expeditions = data.expeditions.filter((el, i) => i >= minIndex && i < maxIndex);
        responseObj.limitExpeditions = expeditions;
        return responseObj;
    }

    return data.expeditions;
}