import express from "express";
import cors from "cors";
import authRouter from "./routing/authRouter.js";
import expeditionsRouter from "./routing/expeditionsRouter.js"

// 
// import { validate } from "./middlewares/validate.js";
// import { workWithData } from "./middlewares/workWithData.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use('/', authRouter);
app.use('/expeditions', expeditionsRouter);


// app.post('/login', validate('authorization'), (req, res) => {
//     res.status(201).send(JSON.stringify(req.body));
// })

// app.post('/register', validate('registration'), (req, res) => {
//     res.status(201).send(JSON.stringify(req.body));
// })

// app.get('/expeditions', workWithData('getAllExpeditions'), ((req, res) => {
//     res.status(200).send(JSON.stringify(req.body));
// }))

// app.route('/expeditions/user/:userId')
//     .get(workWithData('getExpeditionsOfCurrentUser'), (req, res) => {
//         res.status(200).send(JSON.stringify(req.body));
//     })
//     .post(workWithData('postExpedition'), (req, res) => {
//         res.status(201).send(JSON.stringify(req.body));
//     })
//     .put(workWithData('updateExpedition'), (req, res) => {
//         res.status(201).send(JSON.stringify(req.body));
//     })
//     .delete(workWithData('deleteExpedition'), (req, res) => {
//         res.status(201).send(JSON.stringify(req.body));
//     })

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
