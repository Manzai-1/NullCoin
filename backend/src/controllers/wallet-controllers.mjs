import WalletRepositories from '../repositories/wallet-repositories.mjs';

export const addTransaction = (req, res) => {
    const transaction = new WalletRepositories().addTransaction({
        address: req.user.username,
        recipient: req.body.recipient,
        amount: req.body.amount
    });

    res.status(201).json({ success: true, statusCode: 201, data: transaction });
};

export const getWalletInfo = (req, res) => {
    const address = req.user.username;
    const balance = new WalletRepositories().getWalletInfo(address);

    res.status(200).json({
        success: true,
        statusCode: 200,
        data: { address, balance },
    });
};

export const getWalletHistory = (req, res) => {
    const history = new WalletRepositories()
        .getWalletHistory(req.user.username);

    res.status(200).json({
        success: true,
        statusCode: 200,
        data: history,
    });
}