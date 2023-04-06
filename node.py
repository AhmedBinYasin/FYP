import socketio

class SocketIOClient:
    def __init__(self, url):
        self.sio = socketio.Client()
        self.url = url
        self.connected = False

    def connect(self):
        try:
            self.sio.connect(self.url)
            self.sio.on('ActivateReminderResponse', self.server_receive)
            self.sio.on('disconnect', self.on_disconnect)
            self.connected = True
            print(f"Connected to server at {self.url}")
        except socketio.exceptions.ConnectionError as e:
            print(f"Failed to connect to server at {self.url}: {e}")

    def disconnect(self):
        if self.connected:
            self.sio.disconnect()
            print(f"Disconnected from server at {self.url}")
            self.connected = False

    def on_disconnect(self):
        print(f"Disconnected from server at {self.url}")
        self.connected = False

    def server_receive(self, data):
        print(f"Received message: {data}")

    def send_message(self, event, data):
        if self.connected:
            self.sio.emit(event, data)
            print(f"Sent message: {data} with event: {event}")
        else:
            print("Cannot send message: not connected to server")

client = SocketIOClient('http://localhost:5000')
client.connect()
client.send_message('ActivateReminder', 'Reminder activated')




