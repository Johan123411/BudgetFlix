const mongoCollections = require("../config/mongoCollections");
let dataset = mongoCollections.dataset;
var dataSetObj = require("../insert");

let exportedMethods = {
    async addDataSet() {
        let insertStatus;
    	var flaskDataSet = await dataset();
        let checkIfAlreadyPresent = await flaskDataSet.findOne({
            id: 1
        });

        if (await checkIfAlreadyPresent) {
            return true;
        } else {
            insertStatus = await flaskDataSet.insertOne(await dataSetObj);
        }

        if (await insertStatus) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = exportedMethods;
