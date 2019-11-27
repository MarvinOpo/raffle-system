const raffleAPI = require('../api/raffleAPI');

exports.insert = async function (req, res, next) {
    let result = {};

    try {
        await raffleAPI.insert(req.body);
        result['status'] = 'success';
        res.send(result);
    } catch (err) {
        result['status'] = 'error';
        res.send(result);
    }
}

exports.count = async function (req, res, next) {
    try {
        const count = await raffleAPI.count();
        res.send(count);
    } catch (err) {
        let result = {};
        result['status'] = 'error';
        res.send(result);
    }
}

exports.get_winner = async function (req, res, next) {
    try {
        const winner = await raffleAPI.get_winner(req.query.offset);
        res.send(winner);
    } catch (err) {
        let result = {};
        result['status'] = 'error';
        res.send(result);
    }
}

exports.delete = async function (req, res, next) {
    let result = {};

    try {
        await raffleAPI.delete(req.query.raffle_id);
        result['status'] = 'success';
        res.send(result);
    } catch (err) {
        result['status'] = 'error';
        res.send(result);
    }
}