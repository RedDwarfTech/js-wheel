import dayjs from "dayjs";
var TimeUtils = {
    getMonthStart: function () {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    },
    getMonthStartMilliseconds: function () {
        dayjs().startOf('month').valueOf();
    },
    getMonthEndMilliseconds: function () {
        dayjs().endOf('month').valueOf();
    },
    getPrevFormattedTime: function (time) {
        // 拿到当前的时间戳（毫秒) -- 转换为秒
        var currentTime = new Date();
        var currentTimestamp = parseInt((currentTime.getTime() / 1000).toString());
        // 传进来的时间戳（毫秒)
        var t = new Date(time);
        var oldTimestamp = parseInt((t.getTime() / 1000).toString());
        // 年
        var oldY = t.getFullYear();
        // 月
        var oldM = t.getMonth() + 1;
        // 日
        var oldD = t.getDate();
        // 时
        var oldH = t.getHours();
        // 分
        var oldi = t.getMinutes();
        // 秒
        var olds = t.getSeconds();
        // 相隔多少秒
        var timestampDiff = currentTimestamp - oldTimestamp;
        console.log('===========================');
        console.log('间距--》', timestampDiff);
        if (timestampDiff < 60) { // 一分钟以内
            return "刚刚";
        }
        if (timestampDiff < 60 * 60) { // 一小时以内
            return Math.floor(timestampDiff / 60) + '分钟前';
        }
        // 今天的时间
        if (oldY === currentTime.getFullYear() && oldM === (currentTime.getMonth() + 1) && oldD === currentTime.getDate()) {
            // 10:22
            return "".concat(zeroize(oldH), ":").concat(zeroize(oldi));
        }
        // 剩下的，就是昨天及以前的数据
        return "".concat(oldY, "-").concat(zeroize(oldM), "-").concat(zeroize(oldD));
        // 补0
        function zeroize(num) {
            return num < 10 ? "0" + num : num;
        }
    }
};
export default TimeUtils;
