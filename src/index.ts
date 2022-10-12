import { WhatsAppProvider} from "./providers/whatsapp.provider";

const sessionName = 'session-woodstock';

const whatsappProvider = new WhatsAppProvider(sessionName);

whatsappProvider.init();
