import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Produto } from '../entity/Produto';

let Correios = require('node-correios');
let correios = new Correios();

export const calc_preco = async (req: Request, res: Response) => {
    
    const { sCepOrigem, sCdAvisoRecebimento, nVlValorDeclarado, sCdMaoPropria, nVlPeso, nVlLargura, nVlAltura, nVlComprimento, nCdFormato, sCepDestino, nCdServico } = req.body;

    try {

      const args = {
        nCdServico: nCdServico,
        sCepOrigem: sCepOrigem,
        sCepDestino: sCepDestino,
        nCdFormato: +nCdFormato,
        nVlComprimento: +nVlComprimento,
        nVlAltura: +nVlAltura,
        nVlLargura: +nVlLargura,
        nVlPeso: nVlPeso,
        sCdMaoPropria: sCdMaoPropria,
        nVlValorDeclarado: +nVlValorDeclarado,
        sCdAvisoRecebimento: sCdAvisoRecebimento
      };
      
      correios.calcPreco(args)
       .then(result => {
        console.log(result)
         return res.json(result);
       })
        .catch(error => {
         console.log(error)
        return res.status(404).json({message: "erro na funcao calcular frete!"})
       });

    } catch (error) {
      console.log(error)
        return res.status(402).json({message: "erro ao calcular frete!"})
    }
}

export const calc_preco_prazo = async (req: Request, res: Response) => {
    
  const { sCepOrigem, sCdAvisoRecebimento, nVlValorDeclarado, sCdMaoPropria, nVlPeso, nVlLargura, nVlAltura, nVlComprimento, nCdFormato, sCepDestino, nCdServico } = req.body;


  try {

    const args = {
      nCdServico: nCdServico,
      sCepOrigem: sCepOrigem,
      sCepDestino: sCepDestino,
      nCdFormato: nCdFormato,
      nVlComprimento: nVlComprimento,
      nVlAltura: nVlAltura,
      nVlLargura: nVlLargura,
      nVlPeso: nVlPeso,
      sCdMaoPropria: sCdMaoPropria,
      nVlValorDeclarado: nVlValorDeclarado,
      sCdAvisoRecebimento: sCdAvisoRecebimento
    };
    
    console.log(args)
    correios.calcPrecoPrazo(args)
      .then(result => {
        console.log(result)
       return res.json(result);
     })
     .catch(error => {
      console.log(error)
      return res.status(404).json({message: "erro na funcao calcular frete prazo!"})
     });

  } catch (error) {
      console.log(error)
      return res.status(402).json({message: "erro ao calcular frete prazo!"})
  }
}



export const acha_endereco = async (req: Request, res: Response) => {
    
  const { cep } = req.body;

  try {
    
    correios.consultaCEP({ cep: cep})
     .then(result => {
       return res.json(result);
     })
     .catch(error => {
      return res.status(404).json({message: "erro na funcao consultaCEP!"})
     });

  } catch (error) {
      return res.status(402).json({message: "erro ao consultaCEP!"})
  }
}

export const add = async (req: Request, res: Response) => {
    
  const { nome, nCdFormato, nVlLargura, nVlPeso, nVlDiametro, nVlComprimento, nVlAltura, sCdMaoPropria, sCdAvisoRecebimento, nVlValorDeclarado } = req.body;

  try {

    const grupo = await getRepository(Produto).query(`
      INSERT INTO "produto"("nome", "nCdFormato", "nVlLargura", "nVlPeso", "nVlDiametro", "nVlComprimento", "nVlAltura", "sCdMaoPropria", "nVlValorDeclarado", "sCdAvisoRecebimento") VALUES ('${nome}', '${nCdFormato}', '${nVlLargura}', '${nVlPeso}', '${nVlDiametro}', '${nVlComprimento}', '${nVlAltura}', '${sCdMaoPropria}', '${nVlValorDeclarado}', '${sCdAvisoRecebimento}')  RETURNING "id", "nome", "nCdFormato", "nVlAltura", "nVlPeso", "nVlLargura", "nVlDiametro", "nVlComprimento", "sCdMaoPropria", "sCdAvisoRecebimento", "nVlValorDeclarado"
    `);

    return res.json(grupo);

  } catch (error) {
      return res.status(402).json({message: "erro ao add produto!"})
  }
}
export const get_produtos = async (req: Request, res: Response) => {

  try {

    const produto = await getRepository(Produto).find();

    return res.json(produto);

  } catch (error) {
      return res.status(402).json({message: "erro ao pegar produtos!"})
  }
}