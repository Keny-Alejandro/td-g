/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body {
                background-image: url("https://www.politecnicojic.edu.co/images/img/poli-desde-el-cielo.jpg");
                background-size: cover;
                background-repeat: no-repeat;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                /* Esto asegura que el cuerpo ocupe toda la altura de la ventana */
                margin: 0;
                /* Elimina el margen predeterminado del cuerpo */
            }
    
            .div-cont {
                height: 300px;
                width: 300px;
                border-radius: 10px;
                background-color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
    
            .div-cont img {
                max-width: 500px; 
                max-height: 400px;  
                border-radius: 10px;margin-top: 20px;
            }
    
            .div-cont h1 {
                margin-top: -50px;
                font-size: 25px;
                color: #333;
            }
        </style>
    </head>
    
    <body>
    
        <div class="div-cont">
            <img src="https://www.politecnicojic.edu.co/images/logo/logo-poli-v.png" alt="">
            <h1>Sistema de gestor del PPI</h1>
        </div>
    
    </body>
    
    </html>
    `;
  }
}
