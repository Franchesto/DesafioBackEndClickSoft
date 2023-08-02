import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Aluno extends BaseModel {
  public static table = 'aluno';

  @column({ columnName: 'Nome',})
  public Nome: String

  @column({ columnName: 'Matricula', isPrimary: true})
  public Matricula: Number
  
  @column({ columnName: 'E-mail',})
  public Email: String

  @column({ columnName: 'DataNascimento',})
  public DataNascimento: Date

}
