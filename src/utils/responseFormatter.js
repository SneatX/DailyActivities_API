export default function responseFormatter(status, message = null, data = null){
    const response = {
        status: status.toString(),
        message,
    }

    if( message !== null ){
        response.message = message
    }

    if( data !== null ){
        response.data = data
    }

    return response
}