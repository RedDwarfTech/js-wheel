import dayjs from "dayjs";

const TimeUtils = {
    getMonthStart: () => {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    },
    getMonthStartMilliseconds: () => {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    }
}

export default TimeUtils


