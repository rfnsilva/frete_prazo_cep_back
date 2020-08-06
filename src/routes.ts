import { Router, Request, Response } from 'express';

import { calc_preco, get_produtos, calc_preco_prazo, acha_endereco, add } from './controllers/homeController'

import cors from 'cors'

const routes = Router();

routes.use(cors());

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: "PRONTO CARALHOOOOO !" })
});

routes.post('/calc_preco', calc_preco); //feito
routes.post('/calc_preco_prazo', calc_preco_prazo); //feito
routes.post('/add', add); //feito
routes.get('/get_produtos', get_produtos); //feito
routes.post('/acha_endereco', acha_endereco); //feito

export default routes;