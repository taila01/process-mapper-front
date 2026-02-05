import { Bank } from "@/services/interfaces/Bank/bankInterface";

export const banksINSS: Bank[] = [

    {
        bankCode: 149,
        shortname: 'FACTA',
        longname: 'Facta Financeira S.A.',
        ispb: '15581638',
        document: '15.581.638/0001-30',
        logoPath: '/images/banksLogo/facta.png',
        url: 'https://www.facta.com.br/',
        name: 'Facta'
    },
    {
        bankCode: 336,
        shortname: 'BANCO C6',
        longname: 'Banco C6 S.A.',
        ispb: '31872495',
        document: '31.872.495/0001-72',
        logoPath: '/images/banksLogo/cseis.png',
        url: 'https://www.c6bank.com.br/',
        name: 'Facta'
    }, {
        bankCode: 623,
        shortname: 'BANCO PAN',
        longname: 'Banco Pan S.A.',
        ispb: '59285411',
        document: '59.285.411/0001-13',
        logoPath: '/images/banksLogo/pan.png',
        url: 'https://www.pan.com.br/',
        name: 'Facta'
    }

];