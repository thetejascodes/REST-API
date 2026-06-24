class ApiResponses {


    static ok(res,message,data=null) {

        return res.status(200).json({
           status: 'success',
           message: message,
           data: data
        })
    } 

    static created(res,message,data=null){
        return res.status(201).json({
            status: 'success',
            message: message,
            data: data
        })
    }

    static noContent(res){
        return res.status(204).send()
    }
}   


export default ApiResponses
   

    
