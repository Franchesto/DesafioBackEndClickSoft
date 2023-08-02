import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from '../../Models/Professor'

export default class ProfessorsController {
  public async index({response}: HttpContextContract) {
    try{
      const prof = await Professor.all()
      return response.json(prof)
    }
    catch(error){
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async create({request, response}: HttpContextContract) {
    let body = request.body()
    const professor = new Professor()
    professor.Nome = body.Nome
    professor.Email = body.Email
    professor.DataNascimento = body.DataNascimento
    await professor.save()
    return  response.status(200)

  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({response, request}: HttpContextContract) {
    
    let body = request.body() 
    const prof = await Professor.find(body.matricula)

    if(prof){
      prof.merge({
        Nome: body.nome,
        Email: body.email,
        DataNascimento: body.data_nascimento
      })
    }
    else
      return response.status(404).json({ error: 'Post not found' })
    await prof.save()

  }

  public async destroy({params, response}: HttpContextContract) {
    const id = params.id
    const desty = await Professor.find(id)
    if(desty)
      await desty.delete()
    else
      return response.status(404).json({ error: 'Post not found' })
  }
}
