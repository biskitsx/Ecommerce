export const errorMiddleware = (e, req, res, next) => {
    const status = e.status || 500
    const message = e.message || 'Something went wrong'
    res
        .status(status)
        .json({
            success: false,
            status,
            message
        })
}