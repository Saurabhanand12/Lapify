import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getdatauri = (file) => {
    const extname = path.extname(file.originalname).toString();

    const result = parser.format(extname, file.buffer);

    return result;   // ✅ return full object, NOT .content
};

export default getdatauri;