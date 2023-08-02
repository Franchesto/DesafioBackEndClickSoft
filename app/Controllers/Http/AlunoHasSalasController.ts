import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import aluno_has_sala from 'App/Models/aluno_has_sala'
import Sala from 'App/Models/Sala'

export default class AlunoHasSalasController {
  public async index({response}: HttpContextContract) {
    try{
      const al = await aluno_has_sala.all() 
      return response.json(al)
    }
    catch(error){
      return response.status(500).json({ error: error})
    }
  }

  public async create({request, response}: HttpContextContract) {
    const body = request.body()
    const alunoSala = new aluno_has_sala()
    alunoSala.Sala_id = body.sala_id
    alunoSala.Aluno_Matricula = body.aluno_Matricula
    alunoSala.Professor_idProfessor = body.matricula
    let cnt = await aluno_has_sala.query().count('Aluno_Matricula').where('Sala_id', body.sala_id)
    let sala = await Sala.findBy('idSala', body.sala_id)
    let aluno = await aluno_has_sala.findBy('Aluno_Matricula', body.aluno_Matricula)
    if(aluno)
      return response.json({Erro: 'Aluno ja cadastrado'})
    if((cnt[0]['$extras']['count(`Aluno_Matricula`)']) == sala?.Capacidade){
      if(sala){
        sala.merge({
          Disponibilidade: false 
        })
        await sala.save()
      }
    }
    else
      await alunoSala.save()
    
    
    return response.status(200)
  }

  public async store({}: HttpContextContract) {}

  public async show({params, response }: HttpContextContract) {
    try{
      const idSala = params.id  
      let alunos = aluno_has_sala.query().where('Sala_id', idSala)
      return alunos
    }
    catch(error) {
      return response.status(500).json({ error: error})
    }

  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public static async ultimateDestroySala(idSala: number) {
    try{
      let ahs = await aluno_has_sala.query().where('Sala_id', idSala).first()
      if(ahs)
        await ahs.delete()

    }
    catch(error){

    }
    
  }

  public static async ultimateDestroyAluno(idAluno: number) {
    try{
      let ahs = await aluno_has_sala.query().where('Aluno_Matricula', idAluno).first()
      if(ahs)
        await ahs.delete()

    }
    catch(error){

    }
    
  }

  public async destroy({params, response, request}: HttpContextContract) {
    const body = request.body()
    let aMatricula = body.aluno_Matricula
    let idSala = body.idSala
    let as = await aluno_has_sala.query().where('Aluno_Matricula', aMatricula).where('Sala_id', idSala).first()
    try{
      if(as)
        await as.delete()
    }
    catch(error){
      return response.status(404).json({ error: 'Post not found' })
    }
  }
}
