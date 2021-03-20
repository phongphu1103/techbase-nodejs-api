export default ( req, res, next) => {
    // Define response format incase success
    res.jsonSuccess = ({...args}) => {
        let response = {
            success: true,
            status: 'success',
            message: args.message || null,
        };

        args.data && (response = {...response, data: args.data });
        args.record_id && (response = {...response, record_id: args.record_id });
        args.total && (response = {...response, total: args.total });
        return res.status(args.code || 200).json(response);
    };

    // Define response format incase error
    res.jsonError = ({...args}) => {
        let response = {
            success: false,
            status: 'error',
            message: args.message || null,
            errors: args.errors || null
        };

        args.record_id && (response = {...response, record_id: args.record_id });
        return res.status(args.code || 404).json(response);
    };

    next()
}
