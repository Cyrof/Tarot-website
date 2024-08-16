import { v4 as uuidv4} from 'uuid';

export function generateSessionId(pin?: string) : string {
    var sessionId = uuidv4();

    if (pin){
        sessionId = `${pin}-${sessionId}`;
    }

    return sessionId;
}

export function generateRandomPin(): string {
    let pin = Math.random().toString(36).substring(2, 8);
    return pin;
}

