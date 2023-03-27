import dayjs from "dayjs";
export var TimeUtils = {
    getMonthStart: function () {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    },
    getMonthStartMilliseconds: function () {
        dayjs().startOf('month').valueOf();
    },
    getMonthEndMilliseconds: function () {
        dayjs().endOf('month').valueOf();
    },
    getFormattedTime: function (unix_timestamp) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp);
        return TimeUtils.getCurrentFormattedTime(date);
    },
    getCurrentFormattedTime: function (now) {
        if (now === void 0) { now = new Date(); }
        var year = now.getFullYear();
        var month = TimeUtils.padLeftZero(now.getMonth() + 1);
        var date = TimeUtils.padLeftZero(now.getDate());
        var hour = TimeUtils.padLeftZero(now.getHours());
        var minute = TimeUtils.padLeftZero(now.getMinutes());
        var second = TimeUtils.padLeftZero(now.getSeconds());
        var millisecond = TimeUtils.padLeftZero(now.getMilliseconds(), 3);
        return "".concat(year, "-").concat(month, "-").concat(date, " ").concat(hour, ":").concat(minute, ":").concat(second, " ").concat(millisecond);
    },
    padLeftZero: function (val, len) {
        if (len === void 0) { len = 2; }
        return (Array(len).join('0') + val).slice(-len);
    },
    getPrevFormattedTime: function (time) {
        var currentTime = new Date();
        var currentTimestamp = parseInt((currentTime.getTime() / 1000).toString());
        var t = new Date(time);
        var oldTimestamp = parseInt((t.getTime() / 1000).toString());
        var oldY = t.getFullYear();
        var oldM = t.getMonth() + 1;
        var oldD = t.getDate();
        var oldH = t.getHours();
        var oldi = t.getMinutes();
        var olds = t.getSeconds();
        var timestampDiff = currentTimestamp - oldTimestamp;
        if (timestampDiff < 60) { // 一分钟以内
            return "刚刚";
        }
        if (timestampDiff < 60 * 60) { // 一小时以内
            return Math.floor(timestampDiff / 60) + '分钟前';
        }
        if (oldY === currentTime.getFullYear() && oldM === (currentTime.getMonth() + 1) && oldD === currentTime.getDate()) {
            return "".concat(zeroize(oldH), ":").concat(zeroize(oldi));
        }
        return "".concat(oldY, "-").concat(zeroize(oldM), "-").concat(zeroize(oldD));
        function zeroize(num) {
            return num < 10 ? "0" + num : num;
        }
    }
};
export default TimeUtils;
