import express = require('express')
import { Request, Response } from "express"
var router = express.Router()

import Todos from '../models/model-todos'

export class todosRouter {

    public routes(server) {

        server.route('/api/todos').get((req : Request, res : any, next) => {

            let $query : object = {}

            Todos.find($query).sort({ date: -1 }).exec((err, todos) => {

                if (err) {
                    return next(err)
                }

                if (!todos.length) {
                    res.t.message = "No Todos available"
                    return res.status(200).send(res.t)
                }
                
                res.t.success = true
                res.t.message = "Data found"
                res.t.data = todos
                return res.status(200).send(res.t)

            })

        })

        // Sigle Todo Get
        server.route('/api/todos/:id').get(function (req : Request, res : any, next) {

            let { id }: any = req.params

            Todos.findById(id).exec(function (err, todo: any) {

                if (err) {
                    return next(err)
                }

                if (!todo) {
                    res.t.message = "Todo not available"
                    return res.status(404).send(res.t)
                }

                res.t.success = true
                res.t.message = "Todo Found"
                res.t.data = todo

                return res.status(200).send(res.t)

            })

        })

        // insert Todo 
        server.route('/api/todos').post(function (req : Request, res: any, next) {

            // console.log(req.body)
            // console.log(req.body.moreInfo)

            if (!req.body.title || !req.body.place || !req.body.description) {
                res.t.message = "Invalid Request"
                return res.status(203).send(res.t)
            }

            let todo = new Todos({
                title: req.body.title.trim(),
                place: req.body.place.trim(),
                description: req.body.description.trim(),
            });

            todo.save(function (err, todo) {

                if (err) {
                    return next(err)
                }

                res.t.success = true
                res.t.message = "Todo Added"
                res.t.data = todo

                return res.status(200).send(res.t)

            })

        })

        // Update Todos 

        server.route('/api/todos/:id').put(function (req : Request, res: any, next) {

            if (!req.body.title || !req.body.place || !req.body.description) {
                res.t.message = "Invalid Request"
                return res.status(203).send(res.t)
            }

            let { id }: any = req.params;
            let { title, place, description, status }: any = req.body;

            Todos.findByIdAndUpdate(id, { title, place, description, status }).exec(function (err: any, todo: any) {

                if (err) {
                    return next(err)
                }

                res.t.success = true
                res.t.message = "Todo Found"
                res.t.data = todo

                return res.status(200).send(res.t)

            })

        })

        //Delete Todo
        server.route('/api/todos/:id').delete(function (req: Request, res: any, next) {

            let { id }: any = req.params;

            Todos.findByIdAndRemove(id).exec(function (err: any, todo: any) {
                
                if (err) {
                    return next(err)
                }

                res.t.success = true
                res.t.message = "Todo Deleted"
                res.t.data = todo

                return res.status(200).send(res.t)

            })

        })

    }

}
