const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options")
const token = "6117504123:AAG1TVfhmdzeubnNmeJ9p_7TrlFuK_GCzRc";

const bot = new TelegramApi(token, { polling: true });

const chatsAnswers = {

}
const StartGame = async (chatId) => {
    const randomNumber = Math.floor(Math.random() * 10);
    chatsAnswers[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Я загадал число от 0 до 9 попробуй угадать.", gameOptions);
}
const start = () => {
    bot.setMyCommands([
        { command: '/start', description: "Начало работы" },
        { command: '/help', description: "Подсказка" },
        { command: '/game', description: 'Игра "Угадай число"' },

    ])
    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/9df/619/9df6199a-ff6a-338d-9f74-625b0a647045/21.webp");
            return bot.sendMessage(chatId, `Привет, ${msg.chat.first_name}, я рад тебя видеть!`);
        }
        else if (text === '/help') {
            return bot.sendMessage(chatId, "Я могу поиграть с тобой, для этого набери команду /game или напиши: Хочу сыграть.");
        }
        else if (text === 'Хочу сыграть' || text === '/game') {
            StartGame(chatId);
            return;
        }
        return bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/ce3/f51/ce3f5192-4aca-4112-853d-7a270bde4c03/64.webp`);
        //await bot.sendMessage(chatId, `Я еще очень молод и не могу распознать твою команду.`);
    })
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data == "/again") {
            StartGame(chatId);
            return;
        }
        else if (data == chatsAnswers[chatId]) return bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/9df/619/9df6199a-ff6a-338d-9f74-625b0a647045/13.webp", againOptions);
        else {
            return bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/9df/619/9df6199a-ff6a-338d-9f74-625b0a647045/9.webp`, againOptions);
        }
    })
}
bot.on("polling_error", console.log);
start();
