import React from 'react';

import { Category } from "@/types/Category";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";


const tmpProduct : Product = {
    id: 999,
    image: 'https://drive.google.com/uc?export=download&id=1JKDbjqa0HyxRpO_KffVYADwm2gKvEqDR',
    category:{
        id: 99,
        name: 'Medicamentos'
    },
    name: 'Aspirina 20mg',
    price: 35.3,
    description: 'Um medicamento para dores e resfriados'
};

export const api = {
    login: async (email: string, password: string): Promise<{error: string, token?: string}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (email !== 'tiagoflp1@hotmail.com') {
                    resolve({
                        error: 'Email e/ou senha invalidos'
                    })
                } else {
                    resolve({
                        error: '',
                        token: '123'
                    })
                }
            }, 1000);
        });
    },

    forgotPassword: async (email: string) : Promise<{error: string}> =>{
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({error: ''})
            },1000);
        });
    },

    redefinePassword: async (password: string, token: string): Promise<{error: string}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({error: ''})
            },1000);
        });
    },

    getOrders: async (): Promise<Order[]> =>{
        return new Promise(resolve => {
            setTimeout(() => {
                
                const orders: Order[]=[];
                const statuses: OrderStatus[] = ['preparing', 'sent', 'delivered'];

                for(let i=0; i<6; i++) {
                    orders.push({
                        id: parseInt('12'+ i),
                        status: statuses[Math.floor(Math.random() * 3)],
                        orderDate: '2023-05-21 22:04',
                        userid: '1',
                        userName: 'Pedro',
                        shippingAddress: {
                            id: 99,
                            cep: '24914000',
                            address: 'Rua Marcio Rangel Pereira',
                            number: '108',
                            neighborhood: 'Mumbuca',
                            city: 'Marica',
                            state: 'Rio de Janeiro',
                            complement:'Casa Verde'
                        },
                        shippingPrice: 12,
                        paymentType: 'card',
                        changeValue: 0,
                        cupom: 'ONPHARMA',
                        cupomDiscount: 2,
                        products: [
                            { qt: 2, product: tmpProduct },
                            { qt: 3, product: {...tmpProduct, id: 888, name: 'Aspirina 300mg'}}
                        ],
                        subtotal: 99,
                        total: 120
                    });
                }

                resolve (orders);
            },1000);
        });
    },

    changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
        return true;
    },
    getCategories: async (): Promise<Category[]> => {
        const list: Category[] =[
            {id: 99, name: 'Medicamentos'},
            {id: 98, name: 'Perfumaria'},
            {id: 97, name: 'Suplementos'}
        ];
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(list);
            }, 200);
        })
    },
    getProducts: async (): Promise<Product []> => {
        const list: Product[] = [
            {... tmpProduct, id: 123},
            {... tmpProduct, id: 124},
            {... tmpProduct, id: 125},
            {... tmpProduct, id: 126},
            {... tmpProduct, id: 127},
            {... tmpProduct, id: 128},
            {... tmpProduct, id: 129},
            {... tmpProduct, id: 130},
        ]
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(list);
            }, 500);
        })
    },

    deleteProduct: async (id: number): Promise<boolean> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        })
    },

    creatProduct: async (form: FormData) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        })
    },
    
    updateProduct: async (form: FormData)  => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        })
    }
}