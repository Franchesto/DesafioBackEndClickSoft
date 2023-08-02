import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from '../../Models/Aluno'
import aluno_has_sala from '../../Models/aluno_has_sala'
import ExceptionHandler from 'App/Exceptions/Handler'
import AlunoHasSalasController from './AlunoHasSalasController';
import Professor from 'App/Models/Professor'


export default class AlunoController extends ExceptionHandler {

  public async index({response}: HttpContextContract) {

    try {
      const users = await Aluno.all();
      return response.json(users);
    } 
    catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }

  }

  public async create({request, response}: HttpContextContract) {
    let body = request.body();
    const a = new Aluno()
    a.Nome = body.Nome;
    a.Email = body.Email
    a.DataNascimento = body.DataNascimento
    await a.save()
    return  response.status(200)
  }

  public async store({}: HttpContextContract) {}

  public async show({response, params}: HttpContextContract) {

    const id = params.id
    const aluno = await Aluno.findBy('Matricula', id)
    const salas = await aluno_has_sala.query().where('Aluno_Matricula', id)
    let array:object[] = []
    for (let sala of salas){
      let professor = await Professor.findBy('Matricula', sala.Professor_idProfessor)
      array.push({
        Professor: professor?.Nome,
        IdSala: sala.Sala_id
      })
    }
    return response.json({
      Aluno: aluno?.Nome,
      Salas: array
    })

  }

  public async edit({}: HttpContextContract) {}

  public async update({request, response}: HttpContextContract) {
    let body = request.body()
    const update = await Aluno.find(body.matricula)
    if(update){
      update.merge({
        Nome: body.nome,
        Email: body.email,
        DataNascimento: body.data_nascimento
      })
      await update.save()
    }
    else
      return response.status(404).json({ error: 'Post not found' });
    
  }

  public async destroy({request, params, response}: HttpContextContract) {
    AlunoHasSalasController.ultimateDestroyAluno(params.id)
    const id = params.id
    const aluno = await Aluno.find(id)
    if(aluno)
      await aluno.delete()
    else
      return response.status(404).json({ error: 'Post not found' });
  }
}
