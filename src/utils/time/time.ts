import dayjs from "dayjs";

const TimeUtils = {
    getMonthStart: () => {
        dayjs().startOf('month').add(1, 'day').set('year', 2018).format('YYYY-MM-DD HH:mm:ss');
    },
    getMonthStartMilliseconds: () => {
        dayjs().startOf('month').valueOf();
    },
    getMonthEndMilliseconds: () => {
        dayjs().endOf('month').valueOf();
    },
    getFormattedTime (unix_timestamp: number) {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        return TimeUtils.getCurrentFormattedTime(date);
    },
    getCurrentFormattedTime(now: Date = new Date()) {
        const year = now.getFullYear();
        const month = TimeUtils.padLeftZero(now.getMonth() + 1);
        const date = TimeUtils.padLeftZero(now.getDate());
        const hour = TimeUtils.padLeftZero(now.getHours());
        const minute = TimeUtils.padLeftZero(now.getMinutes());
        const second = TimeUtils.padLeftZero(now.getSeconds());
        const millisecond = TimeUtils.padLeftZero(now.getMilliseconds(), 3);
        return `${year}-${month}-${date} ${hour}:${minute}:${second} ${millisecond}`;
    },
    padLeftZero(val: number, len: number = 2){
        return (Array(len).join('0') + val).slice(-len);
    },
    getPrevFormattedTime: (time: number | string) => {
        // 拿到当前的时间戳（毫秒) -- 转换为秒
        let currentTime = new Date()
        let currentTimestamp = parseInt((currentTime.getTime() / 1000).toString())

        // 传进来的时间戳（毫秒)
        let t = new Date(time)
        let oldTimestamp = parseInt((t.getTime() / 1000).toString())

        // 年
        let oldY = t.getFullYear()
        // 月
        let oldM = t.getMonth() + 1
        // 日
        let oldD = t.getDate()
        // 时
        let oldH = t.getHours()
        // 分
        let oldi = t.getMinutes()
        // 秒
        let olds = t.getSeconds()

        // 相隔多少秒
        let timestampDiff = currentTimestamp - oldTimestamp
        if (timestampDiff < 60) { // 一分钟以内
            return "刚刚"
        }

        if (timestampDiff < 60 * 60) { // 一小时以内
            return Math.floor(timestampDiff / 60) + '分钟前'
        }

        // 今天的时间
        if (oldY === currentTime.getFullYear() && oldM === (currentTime.getMonth() + 1) && oldD === currentTime.getDate()) {
            // 10:22
            return `${zeroize(oldH)}:${zeroize(oldi)}`
        }

        // 剩下的，就是昨天及以前的数据
        return `${oldY}-${zeroize(oldM)}-${zeroize(oldD)}`

        // 补0
        function zeroize(num) {
            return num < 10 ? "0" + num : num
        }
    }
}

export default TimeUtils


