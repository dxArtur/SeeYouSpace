const freelaController ={
    create: async(req, res)=>{
        res.send('freela created');
    },
    view: async(req, res)=>{
        res.send('see freela');
    },
    delete: async(req, res)=>{
        res.send('freela deleted');
    },
    update: async(req, res)=>{
        res.send('update freela');
    }
};

module.exports=freelaController;