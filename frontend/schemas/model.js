var mongoose = require('mongoose');
var Config = require('./config.js');
var Metric = require('./metric.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var modelSchema = new Schema({
    model_id: String,
    annotation: String,
    code: String,
    configs: [{type: ObjectId, ref: 'Config'}],
    created_at: {type: Date, default: Date.now},
    metrics: [{type: ObjectId, ref: 'Metric'}],
    project: [{type: ObjectId, ref: 'Project'}],
    type: String,
    updated_at: {type: Date, default: Date.now}
});

// get all models
modelSchema.statics.getAll = function(callback) {
    Model.find({}).populate('configs metrics').exec(function(err, models) {
        if (err) {
            callback({code: 500, err: 'Failed to fetch all models'});
        } else {
            callback({code: 200, data: models});
        }
    });
};

// get specific model
modelSchema.statics.getModel = function(modelId, callback) {
    Model.findOne({_id: modelId}).populate('configs metrics').exec(function(err, models) {
        if (err) {
            callback({code: 500, err: 'Failed to fetch model'});
        } else {
            callback({code: 200, data: models});
        }
    });
};

// get all models for specified project
modelSchema.statics.getProjectModels = function(projectId, callback) {
    Model.find({project: projectId}).populate('configs metrics').exec(function(err, models) {
        if (err) {
            callback({code: 500, err: 'Failed to fetch all models'});
        } else {
            callback({code: 200, data: models});
        }
    });
}

var Model = mongoose.model('Model', modelSchema);
module.exports = Model;