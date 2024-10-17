import {useEffect, useState} from 'react';
import './App.css';
import {apiResponse, ICall} from './type';
import IncomingCallIcon from './assets/svg/ArrowIncoming.svg'
import SkippedCallIcon from './assets/svg/ArrowSkipped.svg'
import OutgoingCallIcon from './assets/svg/ArrowOutgoing.svg'
import NonCallIcon from './assets/svg/ArrowNonCall.svg'
import CollapseIcon from './assets/svg/ArrowCollapse.svg'
import RatingExcellentIcon from './assets/svg/RatingExcellent.svg'

const api = 'https://api.skilla.ru/mango/getList'

function App() {
    const [callList, setCallList] = useState<apiResponse>()
    useEffect(() => {
        fetch(api, {
            method: 'POST',
            headers: {Authorization: 'Bearer testtoken'}
        }).then(response => response.json()).then((res) => setCallList(res)).catch(console.error)
    }, [])
    console.log('callList', callList)
    const getCallTypeIcon = (call: ICall) => {
        if (call.in_out === 1 && call.status === 'Дозвонился') return IncomingCallIcon
        if (call.in_out === 1 && call.status === 'Не дозвонился') return SkippedCallIcon
        if (call.in_out === 0 && call.status === 'Дозвонился') return OutgoingCallIcon
        if (call.in_out === 0 && call.status === 'Не дозвонился') return NonCallIcon
    }
    const getCallTime = (date: Date): string => {
        const hour = new Date(date).getHours();
        const minutes = new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes();
        return `${hour}:${minutes}`
    }

    const formatPhoneNumber = (tel: string, char = '0') => {
        let res = [],
            tIdx = 0;
        for (const c of '+0 (000) 000-00-00')
            res.push(c === char ? tel.charAt(tIdx++) : c);
        return res.join('');
    }
    const formatCallDuration = (time: number): string => {
        if (time === 0) return '';
        const minutes = Math.trunc(time / 60)
        const seconds = time % 60 < 10 ? '0' + time % 60 : time % 60
        return `${minutes}:${seconds}`
    }

    return (
        <div className="App">
            <table>
                <thead>
                <tr>
                    <th>Тип</th>
                    <th>Время <img src={CollapseIcon} alt={"развернуть"}/></th>
                    <th>Сотрудник</th>
                    <th>Звонок</th>
                    <th>Источник</th>
                    <th>Оценка</th>
                    <th>Длительность <img src={CollapseIcon} alt={"развернуть"}/></th>
                </tr>
                </thead>

                <tbody>
                {callList?.results.map((call) => (
                    <tr>
                        <td><img src={getCallTypeIcon(call)} alt={'Статус звонка'}/></td>
                        <td>{getCallTime(call.date)}</td>
                        <td><img src={call.person_avatar} alt={'Аватар'}/></td>
                        <td>{formatPhoneNumber(call.partner_data.phone)}{call.partner_data.name}</td>
                        <td>{call.source}</td>
                        <td>{<img src={RatingExcellentIcon} alt="Оценка"/>}</td>
                        <td>{formatCallDuration(call.time)}</td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    );
}

export default App;
