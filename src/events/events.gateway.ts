import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  MessageBody,
} from '@nestjs/websockets';
import { WebSocketServer as WsServer, WebSocket } from 'ws';

@WebSocketGateway({ path: '/ws' })
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer() server: WsServer;

  handleConnection(client: WebSocket) {
    client.send(JSON.stringify({ event: 'connected', data: 'Kết nối WebSocket thành công' }));
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: unknown) {
    return { event: 'pong', data };
  }

  broadcast(event: string, data: unknown) {
    const message = JSON.stringify({ event, data });
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(message);
    });
  }
}