/*jshint esversion: 6 */

import { body, check } from "../node_modules/express-validator";
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
      case 'modifiedPassword': {
        return [
          body('password', 'Invalid password').isLength({min: 8})
        ]
      }
    }
  };

const orderValidator = () => {
  return [
    body('date').custom((date) => {
      if(typeof date !== 'string') {
        throw new Error('Date is required field');
      }
      return true;
    }),
    body('time').custom((time) => {
      if(typeof time !== 'string'){
        throw new Error('Time is required field');
      }
      return true;
    }),
    body('adult').custom((adult) => {
      if(typeof adult !== 'string'){
        throw new Error('Adult is required field');
      }
      return true;
    }),
    body('children').custom((children) => {
      if(typeof children !== 'string'){
        throw new Error('Children is required field');
      }
      return true;
    })
  ];
};

export default {
  memberValidator,
  orderValidator 
};