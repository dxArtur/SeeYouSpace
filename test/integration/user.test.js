const assert = require('chai').assert
const userController = require('../../src/controller/userController')
const {User: UserModel} = require('../../src/models/User')
const mongoose = require('mongoose')


const conn = require('../../src/db/conn');
//conn();

before((done)=>{
    mongoose.connect(conn(), (err) => {
        if (err) {
            console.error('bad connecion:', err);
            done(err); // Chame "done" com o erro para indicar que houve um erro na conexão
        } else {
            console.log('DB Conected');
            done(); // Chame "done" sem parâmetros para indicar que a conexão foi estabelecida com sucesso
        }
    });
}, 10000)


describe('User Controller', ()=>{
    it('should create a new user', async (done)=>{
        const userData = {
            email: 'email@teste',
            name: 'teste usuario',
            password: '123',
            type: 'cowboy'
        }

        await userController.createUser({body: userData}, {})

        const createdUser = await UserModel.findOne({email:userData.email}).maxTimeMS(50000)
        assert.exists(createdUser, 'User was not created')
        assert.equal(createdUser.email, userData.email, 'Unmatched email')

        assert.equal(createdUser.type, userData.type, 'Unmatched type')
        done()
    })
})




after((done) => {
    mongoose.disconnect((err) => {
      if (err) {
        console.error('Erro ao desconectar do MongoDB:', err);
        done(err);
      } else {
        console.log('Desconectado do MongoDB com sucesso');
        done();
      }
    });
  }, 10000);