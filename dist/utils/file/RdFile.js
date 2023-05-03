export var RdFile = {
    fileToBase64: function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    }
};
export default RdFile;
