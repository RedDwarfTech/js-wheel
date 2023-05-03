export var RdColor = {
    // https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
    colorToRGBA: function (color) {
        var cvs = document.createElement('canvas');
        cvs.height = 1;
        cvs.width = 1;
        var ctx = cvs.getContext('2d');
        if (ctx) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            return ctx.getImageData(0, 0, 1, 1).data;
        }
        return [];
    },
    byteToHex: function (num) {
        return ('0' + num.toString(16)).slice(-2);
    },
    colorToHex: function (color) {
        var rgba, hex;
        rgba = RdColor.colorToRGBA(color);
        hex = [0, 1, 2].map(function (idx) { return RdColor.byteToHex(rgba[idx]); }).join('');
        return "#" + hex;
    }
};
export default RdColor;
