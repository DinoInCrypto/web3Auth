const User = require('./userModel');
const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.ALCHEMY_HTTP)
);

exports.login = async (req, res, next) => {
  try {
    const address = req.body.address;
    let user = await User.findOne({ address });
    let dbMsg;
    if (!user) {
      user = await User.create({ address: address });
      dbMsg = `new user ${address}`;
    } else {
      dbMsg = `user exist`;
    }
    res.status(200).json({
      msg: 'success',
      data: dbMsg,
    });
  } catch (err) {
    res.status(400).json({
      msg: 'error',
      err,
    });
  }
};

exports.signatureVerify = async (req, res, next) => {
  console.log(123);
  try {
    const address = req.body.address;
    const message = req.body.message;
    const sign = req.body.sign;
    const signer = await web3.eth.accounts.recover(message, sign);
    if (signer != address) {
      res.status(400).json({
        msg: 'error',
        data: 'Wrong signature',
      });
    }
    return next();
  } catch (err) {
    res.status(400).json({
      msg: 'error',
      err,
    });
  }
  console.log(345);
};
