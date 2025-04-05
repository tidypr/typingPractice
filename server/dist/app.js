"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const UESR = [];
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const fetchText = async () => {
    const resData = await fetch('https://korean-advice-open-api.vercel.app/api/advice');
    const data = await resData.json();
    return data;
};
const fetchText2 = async () => {
    const resData = await fetch('https://dummyjson.com/quotes/random');
    const data = await resData.json();
    console.log(data);
    return data;
};
const fetchWord = async () => {
    const resData = await fetch('https://random-word-api.vercel.app/api?words=300');
    const data = await resData.json();
    console.log(data);
    return data;
};
app.get('/api/korean', async (req, res, next) => {
    const data = await fetchText();
    console.log(data);
    res.json({ message: 'Hello World!!!!!' });
});
app.get('/api/english', async (req, res, next) => {
    const data = await fetchText2();
    console.log(data.quote);
    res.json({ message: data.quote });
});
app.get('/api/englishWord', async (req, res, next) => {
    const data = await fetchWord();
    console.log(data);
    res.json({ data: data });
});
app.post('/api/rank', async (req, res, next) => {
    const { userName: name, score } = await req.body;
    const result = await prisma.user.create({
        data: {
            name,
            score,
        }
    });
    const curRank = 1;
    res.json({ message: curRank });
});
app.get('/api/rank', async (req, res, next) => {
    const result = await prisma.user.findMany({
        take: 10,
        orderBy: {
            score: 'desc'
        }
    });
    res.json({ data: result });
});
exports.default = app;
