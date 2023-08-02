/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AlunoController from 'App/Controllers/Http/AlunoController'

Route.group(() => {
  Route.post('/create', 'AlunoController.create')
  Route.get('/read', 'AlunoController.index')
  Route.put('/update', 'AlunoController.update')
  Route.delete('/delete/:id', 'AlunoController.destroy')
  Route.get('/show/:id', 'AlunoController.show')

}).prefix('/aluno')

Route.group(() => {
  Route.post('/create', 'ProfessorsController.create')
  Route.get('/read', 'ProfessorsController.index')
  Route.put('/update', 'ProfessorsController.update')
  Route.delete('/delete/:id', 'ProfessorsController.destroy')

  Route.group(() => {
    Route.post('/create/:id', 'SalasController.create')
    Route.get('/read', 'SalasController.index')          
    Route.put('/update', 'SalasController.update')
    Route.delete('delete/:id', 'SalasController.destroy')
  }).prefix('/sala')

  Route.group(() => {
    Route.post('/alocar', 'AlunoHasSalasController.create')  
    Route.get('/read', 'AlunoHasSalasController.index')   
    Route.get('/alunos/:id', 'AlunoHasSalasController.show')
    Route.delete('/delete/:id', 'AlunoHasSalasController.destroy')
  }).prefix('/ahs')
                          
}).prefix('/professor')






