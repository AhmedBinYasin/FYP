import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


export function connect_to_node(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    io.emit('server_recive','abc')
}