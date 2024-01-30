import { getResponseTemplate } from "../lib/getResponseTemplate.js";
import { 
    getExpeditionsOfCurrentUser, 
    addNewExpedition, 
    updateExpedition,
    deleteExpedition } from "../servicing/userExpeditionsService.js";

export async function getUserExpeditionsController(req, res) {
    try{
        const { userId } = req.params; // string
        const { forUserId } = req.body// userId из body, добавлено в authenticate
        
        if(+userId === forUserId) { // дополнительная проверка
            const data = await getExpeditionsOfCurrentUser(+userId);
            const response = getResponseTemplate(data, null);
            return res.status(200).send(response);
        }

        const message = '404 Not Found';
        const response = getResponseTemplate(null, message);
        return res.status(404).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}

export async function postUserExpeditionsController(req, res) {
    try {
        const { userId } = req.params; // string
        const { title } = req.body;
        const newExpedition = await addNewExpedition(+userId, title);
        const response = getResponseTemplate(newExpedition, null);
        return res.status(201).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}

export async function putUserExpeditionsController(req, res) {
    try{
        const updatedExpedition = await updateExpedition(req.body);

        if(updatedExpedition) { // пост существует и соответственно его обновили
            const response = getResponseTemplate(updatedExpedition, null);
            return res.status(201).send(response);
        }

        // пост не был найден
        const message = "404 Not Found";
        const response = getResponseTemplate(null, message);
        return res.status(404).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}

export async function deleteUserExpeditionsController(req, res) {
    try{
        const { expeditionId } = req.query;
        const deletedExpedition = await deleteExpedition(+expeditionId);
    
        if(deletedExpedition) {
            const response = getResponseTemplate(deletedExpedition, null);
            return res.status(200).send(response);
        }
    
        const message = "404 Not Found";
        const response = getResponseTemplate(null, message);
        return res.status(404).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}