import dayjs from "dayjs";
var TimeUtils = {
    getMonthStart: function () {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    },
    getMonthStartMilliseconds: function () {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    }
};
export default TimeUtils;
