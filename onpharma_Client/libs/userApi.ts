import { Address } from "@/types/Address";
import { CartItem } from "@/types/CartItem";
import { Order } from "@/types/Order";
import { Product } from "@/types/Product";
import { Tenant } from "@/types/Tenant";
import { User } from "@/types/User";

const TEMPORARYoneProduct: Product = {
    id: 1,
    image: '/temp/aspirina.png',
    categoryName:'Medicamento', 
    name:'Aspirina 200mg', 
    price: 25.50,
    description: 'Aspirina 200mg, utilizada para dores no corpo e de cabeca, este medicamento e fabricado por Bayer'
}

const TEMPORARYOrder: Order = {
    id: 123,
    status: 'preparing',
    orderDate: '2023-05-21',
    userid: '123',
    shippingAddress:{
        id: 2,
        street: 'Rua Marcio Rangel Pereira',
        number: '108',
        cep: '24914000',
        city: 'Marica',
        neighborhood: 'Mumbuca',
        state: 'RJ'
    },
    shippingPrice: 9.14,
    paymentType: 'card',
    cupom: 'ONPHARMA',
    cupomDiscount: 14.3,
    products: [
        {product: {...TEMPORARYoneProduct, id: 1}, qt: 1},
        {product: {...TEMPORARYoneProduct, id: 2}, qt: 2},
        {product: {...TEMPORARYoneProduct, id: 3}, qt: 1},
    ],
    subtotal: 204,
    total: 198.84
}

export const useApi = (tenantSlug: string) =>({

    getTenant: async () => {
        switch(tenantSlug) {
            case 'onpharma':
                return {
                    slug: 'onpharma',
                    name: 'ON•Pharma',
                    mainColor: '#FB3C00',
                    secondColor: '#FFF9F2',
                }
                break;
            case 'pacheco':
                return {
                    slug: 'pacheco',
                    name: 'Drogarias Pacheco',
                    mainColor: '#6AB70A',
                    secondColor: '#E0E0E0',
                }
            default: return false;
        }
    },

    getAllProducts: async () => {
        let products = [];
        for(let q = 0; q < 10; q++) {
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1
            })
        }
        return products;
    },

    getPruduct: async (id: number) => {
        return {
            ...TEMPORARYoneProduct, id};
    },

    authorizeToken: async (token: string): Promise<User | false> => {
        if (!token) return false;

        return {
            name: 'Tiago Castro',
            email: 'Adm@adm.com'
        }
    },
    getCartProducts: async (cartCookie: string) => {
        let cart: CartItem[] = [];
        if (!cartCookie) return cart;

        const cartJson = JSON.parse(cartCookie);

        for (let i in cartJson){
            if (cartJson[i].id && cartJson[i].qt){
                const product = {
                    ...TEMPORARYoneProduct,
                    id: cartJson[i].id 
                };
                cart.push({
                    qt: cartJson[i].qt,
                    product
                });
            }
        }

        return cart;
    },
    getUserAddresses: async (email: string) => {
        const addresses: Address[] = [];

        for(let i=0; i<4; i++) {
            addresses.push({
                id: i + 1,
                street: 'Rua Marcio Rangel Pereira',
                number: `${i+1}00`,
                cep: '24914000',
                city: 'Marica',
                neighborhood: 'Mumbuca',
                state: 'RJ'
            });
        }

        return addresses;
    },

    getUserAddress: async (addressid: number) => {
        let address: Address = {
            id: addressid,
            street: 'Rua Marcio Rangel Pereira',
            number: `${addressid}00`,
            cep: '24914000',
            city: 'Marica',
            neighborhood: 'Mumbuca',
            state: 'RJ'
        }
        return address;
    },

    addUserAddress: async (address: Address) => {
        return {...address, id: 9};
    },

    editUserAddress: async (newAddressData: Address) => {
        return true;
    },

    deleteUserAddress: async (addressid: number) => {
        return true;
    },

    getShippingPrice: async (address: Address) => {
        return 9.16;
    },
    setOrder: async (
        address: Address,
        paymentType: 'money' | 'card',
        paymentChange: number,
        cupom: string,
        cart: CartItem[]

    ) => {
        return TEMPORARYOrder;

    },

    getOrder: async (orderid: number) => {
        return TEMPORARYOrder;
    }

});