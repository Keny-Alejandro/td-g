    export const fileNameCall = (req, file, callback) => {
        const fullFileName = file.originalname;
        callback(null, `${fullFileName}`)
    }

    export const fileFilter = (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Formato de imagen invalido'), false);
        }
        callback(null, true);
    }