
const TimeUtils = {
    getMonthStart: (date) => {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    }
}

export default TimeUtils


