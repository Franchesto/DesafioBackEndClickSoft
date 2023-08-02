import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from '../../Models/Sala'
import AlunoHasSalasController from './AlunoHasSalasController'

export default class SalasController {
  public async index({response}: HttpContextContract) {
    try{
      const sala = await Sala.all()
      return sala
    }
    catch(error){
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async create({request, response}: HttpContextContract) {
    const body = request.body()
    const sala = new Sala()
    sala.Capacidade = body.Capacidade
    sala.Disponibilidade = body.Disponibilidade
    sala.Professor_idProfessor = body.matricula
    await sala.save()
    return  response.status(200)
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({request, response}: HttpContextContract) {
    let body = request.body()
    let ud = await Sala.find(body.idSala)
    if(ud){
      ud.merge({
        Capacidade: body.capacidade
      })
      await ud.save()
    }
    else
      return response.status(404).json({ error: 'Post not found' })
  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id
    AlunoHasSalasController.ultimateDestroySala(id)
    let sl = await Sala.find(id)
    if(sl)
      sl.delete()
    else
      return response.status(404).json({ error: 'Post not found' })
  }
}
