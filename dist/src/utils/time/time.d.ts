declare const TimeUtils: {
    getMonthStart: () => void;
    getMonthStartMilliseconds: () => void;
    getMonthEndMilliseconds: () => void;
    getFormattedTime(unix_timestamp: number): string;
    getCurrentFormattedTime(now?: Date): string;
    padLeftZero(val: number, len?: number): string;
    getPrevFormattedTime: (time: number | string) => string;
};
export default TimeUtils;
