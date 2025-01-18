import express, { Request, Response } from 'express';
import { ip } from 'address';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/server_ip_address', (req: Request, res: Response) => {
    res.json({ server_ip_address: ip() });
});

app.get('/server_local_time', (req: Request, res: Response) => {
    const time = new Date();
    const formattedTime = time.toLocaleTimeString('en-GB', { timeZone: 'GMT', hour12: false });
    const offset = -time.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60);
    const offsetMinutes = Math.abs(offset) % 60;
    const offsetSign = offset >= 0 ? '+' : '-';
    const formattedOffset = `GMT${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
    res.json({ server_local_time: `${formattedTime} ${formattedOffset}` });
});

app.get('/my_name', (req: Request, res: Response) => {
    res.json({ server_my_name: 'Jaiden Siu' });
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`)
});

module.exports = app;
