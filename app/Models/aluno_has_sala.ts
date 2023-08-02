import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class aluno_has_sala extends BaseModel{

    public static table = 'aluno_has_sala'

    @column({columnName: 'id', isPrimary: true})
    public id: Number

    @column({columnName: 'Aluno_Matricula',})
    public Aluno_Matricula: number
     
    @column({columnName: 'Sala_id'})
    public Sala_id: number

    @column({columnName: 'Professor_Matricula'})
    public Professor_idProfessor: number

}