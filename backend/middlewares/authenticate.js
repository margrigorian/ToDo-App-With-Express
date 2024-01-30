import { checkToken } from "../servicing/expeditionsService.js";
import { getResponseTemplate } from "../lib/getResponseTemplate.js";

export function authenticate(access = false) {
    return async (req, res, next) => {
        try{
            let message;
            const bearer = req.headers.authorization || '';
            const token = bearer.split(' ')[1];
            const id = await checkToken(token); // id пользователя
            
            if(id || id === 0) { // токен есть, действительный, user найден и еще админовский нулевой id
                req.body = {...req.body, forUserId: id};
                if(access) { // доступ на действия для админа
                    
                    if(id === 0) { // пользователь является админом
                        next();
                        return
                    }

                    message = "403 Forbidden";
                    const response = getResponseTemplate(null, message);
                    return res.status(403).send(response);
                }else {
                    next();
                    return;
                }
            }

            message = "401 Unauthorized";
            const response = getResponseTemplate(null, message);
            return res.status(401).send(response);
        }catch(err) {
            const message = "500 Server Error";
            const response = getResponseTemplate(null, message);
            return res.status(500).send(response);
        }
    }
}