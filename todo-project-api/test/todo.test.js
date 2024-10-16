// const request=require('supertest')
// const chai=require('chai')
// import chai from 'chai'
// const {expect}=chai;
// const app=require('../app')
import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js'

describe('Todo List Api project',()=>{
    let todoId;

    it('should create a new todo item',async()=>{
        const res=await request(app).post('/todos').send({title:'Testing to-do item'})
        expect(res.status).to.equal(201); //status for the item which has been created is 201
        expect(res.body).to.have.property('_id');  //here we are looking for mongodb generated id
        todoId=res.body._id; //we are here saving id for further tests
    })

    it('should fetch all to-do item',async()=>{
        const res=await request(app).get('/todos');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    })

    it('should update a to-do item',async()=>{
        const res=await request(app).patch(`/todos/${todoId}`).send({title:'Updated test to-do'});
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Updated test to-do');
    })

    it('should mark a to do as complete',async()=>{
        const createRes=await request(app).post('/todos').send({title:'completed this todo'})
        const completeRes=await request(app).patch(`/todos/${createRes.body._id}/complete`)
        expect(completeRes.status).to.equal(200);
        expect(completeRes.body.completed).to.be.true;
    })

    it('should delete a todo item',async()=>{
        const res=await request(app).delete(`/todos/${todoId}`);
        expect(res.status).to.equal(204)
    })
})