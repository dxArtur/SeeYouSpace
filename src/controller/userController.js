
const userController = {
    createUser: async (req, res)=>{
        res.send('route register');
    },

    loginUser: async(req, res)=>{
        res.send('route login');
    },

    deleteUser: async(req, res)=>{
        res.send('route delete');
    },

    updateUser: async(req, res)=>{
        res.send('route update');
    }
}

module.exports = userController;