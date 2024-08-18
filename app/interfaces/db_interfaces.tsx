/**
 * Represents a session for a room in the application.
 * 
 * This interface defines the structure of a room session object, 
 * which includes the room's unique pin, session ID, and the creation date.
 * 
 * @interface
 */
export interface roomSession {
    room_pin: string;
    room_sess: string;
    isHost: boolean;
    createdAt: Date;
};