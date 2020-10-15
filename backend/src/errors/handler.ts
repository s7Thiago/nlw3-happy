import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[]
}

// Personaliza a saída de erro, direcionando uma mensagem mais simples para o usuário 
// comum (internal sever error) e um feedback mais específico sobre os dados que forem 
// enviados quando ocorrer um erro
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

    // Retorna os erros para o front-end de uma maneira amigável
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        });

        return response.status(400).json({ message: 'validation fails', errors });
    }

    console.error(error);

    return response.status(500).json({ message: 'internal server error' });
}

export default errorHandler;