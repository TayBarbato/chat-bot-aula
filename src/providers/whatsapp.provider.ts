import { create, Message, Whatsapp} from 'venom-bot';
import {Sender} from 'venom-bot/dist/api/model/message';
import { DatabaseProvider } from './database.provider';

    const NEW_USER_FLOW = 'newUser'

export class WhatsAppProvider{
    private sessionName: string;
    private client: Whatsapp

    //@param { string} sessionName

    constructor(sessionName: string) {
        this.sessionName = sessionName
    }


async init (){
    create ({
        session: this.sessionName,
        multidevice: true,
        headless: true,
        devtools: false,
        useChrome: true,
        debug: false,
        logQR: true,
    }).then((client: Whatsapp)=> {
        this.client = client
        this.listen()
    })
}

listen() {
    this.client.onMessage(async(message: Message) => {
        const isMessageTextAndNotGroup = this.
            isMessageTextAndNotGroup(message)

        if (!isMessageTextAndNotGroup){
            return;
        }
        const to = message.chat.presence.id;

        if (message.body == 'ping') {
            await this.client.sendText(to, 'pong');
        }
    });
}

//@param message
//@returns

private isMessageTextAndNotGroup(message: Message): boolean {
    return ! message.isGroupMsg 
    && ! message.isMedia 
    && ! message.isMMS
}
}