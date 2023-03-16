import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Review from './Review-form';
import Container from '@mui/material/Container';
import { nameParser } from './CommonUtility';
import ReviewForm from './ReviewForm';
// all available config props
const config ={
  width: "500px",
  height: "500px", 
  headerTitle:  'Check your BMI',
  // floating: true
};
const avatarStyles = {
  width: "40px",
  height: "40px", 
}
const theme = {
  top: "50px",
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#117dc2',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#117dc2',
  botFontColor: '#fff',
  userBubbleColor: '#f2cea5',
  userFontColor: '#4a4a4a',
  botAvatar: avatarStyles
};
const botAvatar = require('./assets/bot-avatar.jpg')

class SimpleForm extends Component {
  render() {
    return (
<Container maxWidth="sm" style={{marginTop: '40px'}}> 
      <ThemeProvider theme={theme}>
      <ChatBot
      botAvatar = {botAvatar || null}
      avatarStyle={avatarStyles}
      steps={[
        {
          id: '1',
          message: 'Hi, this is Joe 😊. What is your name?',
          trigger: 'name',
  
        },
        {
          id: 'name',
          user: true,
          trigger: '3'
        },
        {
          id: '3',
          message: ({ previousValue, steps }) => `Hi ${nameParser(previousValue)}! What is your gender?`,
          trigger: 'gender',
        },
        {
          id: 'gender',
          options: [
            { value: 'Male', label: 'Male', trigger: '5' },
            { value: 'Female', label: 'Female', trigger: '5' },
          ],
        },
        {
          id: '5',
          message: 'How old are you?',
          trigger: 'age',
        },
        {
          id: 'age',
          user: true,
          trigger: '7',
          validator: (value) => {
            if (isNaN(value)) {
              return 'value must be a number';
            } else if (value < 0) {
              return 'value must be positive';
            } else if (value > 120) {
              return `${value}? Come on!`;
            }

            return true;
          },
        },
        {
          id: '7',
          message: 'Please select an option to enter your height',
          trigger: 'heightUnits',
        },
        {
          id: 'heightUnits',
          options: [
            { value: 'ft', label: 'Feet', trigger: ({ previousValue, steps }) => 'ft' },
            { value: 'cm', label: 'Centi meters', trigger: ({ previousValue, steps }) => 'cm' }
          ],
        },
        {
          id: 'cm',
          delay: 300,
          message: 'Please enter your height in cm',
          trigger: 'heightCm',
        },
        {
          id: 'heightCm',
          user: true,
          trigger: '8',
          validator: (value, steps) => {
            if (isNaN(value)) {
              return 'value must be a number';
            } else if (Number(value) < 0) {
              return 'value must be positive';
            }
            return true;
          },
        },
        {
          id: 'ft',
          delay: 300,
          message: 'Please enter your height in ft',
          trigger: 'heightFt',
        },
        {
          id: 'heightFt',
          user: true,
          trigger: '8',
          validator: (value, steps) => {
            if (isNaN(value)) {
              return 'value must be a number';
            } else if (Number(value) > 10) {
              return `${value} ft! Seriously ?`;
            }
            return true;
          },
        },
        {
          id: '8',
          message: 'Please enter your weight (kg)',
          trigger: 'weight',
        },
        {
          id: 'weight',
          user: true,
          trigger: '9',
          validator: (value) => {
            if (isNaN(value)) {
              return 'value must be a number';
            } else if (value < 0) {
              return 'value must be positive';
            }
            return true;
          },
        },
        {
          id: '9',
          message: 'Great! Check out your BMI',
          trigger: 'review',
        },
        {
          id: 'review',
          component: <ReviewForm />,
          asMessage: true,
          trigger: 'update',
        },
        {
          id: 'update',
          message: 'Select below options to update the data/exit',
          trigger: 'update-question',
        },
        {
          id: 'update-question',
          options: [
            { value: 'yes', label: 'Reset', trigger: '3' },
            { value: 'no', label: 'End', trigger: 'end-message' },
            { value: '', label: 'Update height/weight', trigger: '7' },
          ],
        },
        {
          id: 'end-message',
          message: 'Thanks. have a great day 😃',
          // end: true,
          trigger: 'chatOption'
        },
        {
          id: 'chatOption',
          options: [
            { value: 'Hi', label: 'Start chat', trigger: '1' }],
            // end: true
        },
      ]}
        {...config}
      />
        </ThemeProvider>
        </Container>
        );
      }

    }

    export default SimpleForm;