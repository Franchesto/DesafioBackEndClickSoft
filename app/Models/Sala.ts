import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sala extends BaseModel{

    public static table = 'sala'

    @column({ columnName: 'idSala', isPrimary: true})
    public idSala: number

    @column({columnName: 'Capacidade'})
    public Capacidade: number

    @column({columnName: 'Disponibilidade'})
    public Disponibilidade: boolean

    @column({columnName: 'Professor_Matricula'})
    public Professor_idProfessor: number


}