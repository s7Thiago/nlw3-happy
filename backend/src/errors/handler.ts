import { ErrorRequestHandler } from 'express';

// Personaliza a saída de erro, direcionando uma mensagem mais simples para o usuário 
// comum (internal sever error) e um feedback mais específico sobre os dados que forem 
// enviados quando ocorrer um erro
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.error(error);

    return response.status(500).json({ message: 'internal server error' });
}

export default errorHandler;