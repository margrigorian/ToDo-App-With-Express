import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../lib/config.js';

const dataPath = path.resolve('db/db.json');

async function getData() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
}

export async function checkUser(email, password) { // проверка наличия пользователя
    const data = await getData();
    const user = data.users.find(el => el.email === email); // проверка наличия email

    let areSame = undefined;
    if(user) {
        areSame = await bcrypt.compare(password, user.password); // проверка соответствия пароля
    }

    if(user && areSame) {
        return user;
    }else {
        return null;
    }
}

export async function addNewUser(name, email, password) {
    const data = await getData();
    const newUser = {
        id: data.users.length, // потому как первый пользователь с id:0
        name,
        email,
        password: await passwordHashing(password)
    }
    
    data.users.push(newUser);
    await fs.writeFile(dataPath, JSON.stringify(data));
    return newUser;
}

async function passwordHashing(password) { // хеширование пароля
    const hashpassword = await bcrypt.hash(password, 10);
    return hashpassword;
}

export function getToken(userId) {
    const payload = {
        id: userId
    }

    const token = jwt.sign(payload, secret, {expiresIn: '12h'});
    return token;
}