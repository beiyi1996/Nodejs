/*jshint esversion: 6 */

import { body } from "../node_modules/express-validator";
import Member from "../models/member";

const memberValidator = (method) => {
    switch (method){
      case 'register': {
        return [
          body('email', 'Invalid email').isEmail().custom(value => {
            return Member.findOne({email: value}).then(member => {
              if(member) {
                return Promise.reject('E-mail already in use');
              }
            });
          }),
          body('password', 'Invalid password').isLength({min: 8}),
          body('gender').optional({ checkFalsy: true }),
          body('phone').isLength({min: 10}),
          body('name').isLength({min: 1}).custom(value => {
            return Member.findOne({name: value}).then(member => {
              if(member) {
                return Promise.reject('Nickname already in use');
              }
            });
          })
        ];
      }
      case 'login': {
        return [
          body('email', 'Invalid email').isEmail().custom(value => {
            return Member.findOne({email: value}).then(member => {
              if(!member) {
                return Promise.reject('Invalid email');
              }
            });
          })
        ];
      }
      case 'forgotPassword': {
        return [
          body('email', 'Invalid email').isEmail().custom(value => {
            return Member.findOne({email: value}).then(member => {
              if(!member) {
                return Promise.reject('Invalid email');
              }
            });
          })
        ];
      }
    }
  };

const orderValidator = () => {
  body('date', 'Date is required field').isEmpty();
  body('time', 'Time is required field').isEmpty();
  body('adult', 'Adult is required field').isEmpty();
  body('children', 'Children is required field').isEmpty();
};

module.exports = { memberValidator, orderValidator };