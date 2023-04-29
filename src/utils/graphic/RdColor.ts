export const RdColor = {
    // https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
    colorToRGBA: (color: string) => {
        let cvs = document.createElement('canvas');
        cvs.height = 1;
        cvs.width = 1;
        let ctx: CanvasRenderingContext2D | null = cvs.getContext('2d');
        if (ctx) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            return ctx.getImageData(0, 0, 1, 1).data;
        }
        return [];
    },
    byteToHex: (num: number) => {
        return ('0' + num.toString(16)).slice(-2);
    },
    colorToHex: (color: string) => {
        var rgba, hex;
        rgba = RdColor.colorToRGBA(color);
        hex = [0, 1, 2].map(
            function (idx) { return RdColor.byteToHex(rgba[idx]); }
        ).join('');
        return "#" + hex;
    }
}

export default RdColor;
