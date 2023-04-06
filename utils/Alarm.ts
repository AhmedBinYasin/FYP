import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import Alarms from "../models/Dates";
import History from "../models/RemindersHistory";

export async function AlarmLoop(UserName: string, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    let Reminders = await Alarms.find({ UserName: UserName }) as Array<{ UserName: string, Date: Date, Message: string, Enable: boolean }>
    let now: Date = new Date();
    let Passed = Reminders.filter((Reminder) => Reminder.Date < now);
    if (Passed.length > 0) {
        await History.create({ UserName: Passed[0].UserName, Date: Passed[0].Date, Message: Passed[0].Message, state: (Passed[0].Enable === true ? 'triggered' : 'passed but did not triggered') })
        let response = await Alarms.deleteOne({ Date: Passed[0].Date })
        console.log(Passed, response)
        let data={ UserName: Passed[0].UserName, Date: Passed[0].Date, Message: Passed[0].Message }
        io.emit('ActivateReminderResponse',data)
    }
}