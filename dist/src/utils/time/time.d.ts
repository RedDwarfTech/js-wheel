declare const TimeUtils: {
    getMonthStart: () => void;
    getMonthStartMilliseconds: () => void;
    getMonthEndMilliseconds: () => void;
    getPrevFormattedTime: (time: number | string) => string;
};
export default TimeUtils;
