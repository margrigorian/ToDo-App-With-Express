import { getExpeditions } from "../servicing/expeditionsService.js";
import { getResponseTemplate } from "../lib/getResponseTemplate.js";

export async function getExpeditionsController(req, res) {
    try{
        const { page, limit} = req.query; // если нет, то undefined
        const expeditions = await getExpeditions(page, limit);
        const response = getResponseTemplate(expeditions, null);
        return res.status(200).send(response);
    }catch(err) {
        const message = "500 Server Error";
        const response = getResponseTemplate(null, message);
        return res.status(500).send(response);
    }
}