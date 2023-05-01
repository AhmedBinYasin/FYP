import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Nodes from "../models/Devices";
import AlertHistory from "../models/AlertHistory";
import AdminLogs from "../models/AdminLogs";

let ConnectedDevices: { sID: string, nID: string }[] = []

export async function nodeConfig(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    io.on('connection', (socket) => {
        socket.on('OPCode', async (data) => {
            ConnectedDevices.push({ sID: socket.id, nID: data.Id });
            let devices = await Nodes.findOne({ Node_ID: data.Id })
            if (devices) {
                devices.Connection = true
                devices.save()
            }
            else {
                Nodes.create({ Node_ID: data.Id, Location: data.Location, Connection: true })
            }
            AdminLogs.create({Type:'Node connect',Address:socket.id})
        });
        socket.on('disconnect', async () => {
            const index = ConnectedDevices.findIndex((element) => element.sID === socket.id);
            if (index !== -1) {
                let devices = await Nodes.findOne({ Node_ID: ConnectedDevices[index].nID })
                ConnectedDevices.splice(index, 1);
                if (devices) {
                    devices.Connection = false
                    devices.save()
                }
                AdminLogs.create({Type:'Node disconnect',Address:socket.id})
            }
        });
        socket.on('Output', async (data) => {
            const index = ConnectedDevices.findIndex((element) => element.sID === socket.id);
            let devices = await Nodes.findOne({ Node_ID: ConnectedDevices[index].nID })
            if (devices?.Connection === true) {
                AlertHistory.create({ OutputType: 'AlertNotifiation', Content: data.output, DeviceID: ConnectedDevices[index].nID, Location: devices.Location })
                let Alertdata={ Content: data.output, Location: devices.Location }
                io.emit('ActivateAlert',Alertdata)
            }
        });
    });
}