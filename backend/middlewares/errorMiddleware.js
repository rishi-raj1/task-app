export const notFound = async (req, res, next) => {
    return res.status(404).json({ message: `Not found: ${req.path}` })
}


export const errorHandler = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
}