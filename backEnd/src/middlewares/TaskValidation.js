const { isPast } = require('date-fns');
const TaskModel = require('../model/TaskModel')

const TaskValidation = async(req, res, next) => {
    
    const { macaddress, type, title, description, when } = req.body

    if(!macaddress)
    return res.status(400).json({ error: 'macaddress é obrigatório'});
    else if(!type)
    return res.status(400).json({ error: 'O tipo é obrigatório'});
    else if(!title)
    return res.status(400).json({ error: 'O título é obrigatório'});
    else if(!description)
    return res.status(400).json({ error: 'A descrição é obrigatório'});
    else if(!when)
    return res.status(400).json({ error: 'A data e hora são obrigatórios'});
    
    else {
        
        let exists;

        if(req.params.id) {
            exists = await TaskModel.findOne({ '_id' : {'$ne' : req.params.id}, 'when': {'$eq' : new Date(when)}, 'macaddress' : {'$in' : macaddress} })

        } else {
            if(isPast(new Date(when)))
                return res.status(400).json({ error: 'Escolha uma data e hora válida'});
            exists = await TaskModel.findOne({ 'when': {'$eq' : new Date(when)}, 'macaddress' : {'$in' : macaddress} })

        }
        
        
        if(exists) {
            return res.status(400).json({ error: 'Já existe uma tarefa neste dia'});
        }

        next();
    }


}

module.exports = TaskValidation;