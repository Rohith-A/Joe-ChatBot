import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Review from './Review-form';
import Container from '@mui/material/Container';
// all available config props
const config ={
  width: "500px",
  height: "500px", 
  headerTitle:  'Check your BMI'
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
          message: 'Hi, this is Joe. What is your name?',
          trigger: 'name',
  
        },
        {
          id: 'name',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'Hi {previousValue}! What is your gender?',
          trigger: 'gender',
        },
        {
          id: 'gender',
          options: [
            { value: 'male', label: 'Male', trigger: '5' },
            { value: 'female', label: 'Female', trigger: '5' },
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
          message: 'Please enter your height (cm)',
          trigger: 'height',
        },
        {
          id: 'height',
          user: true,
          trigger: '8',
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
          message: 'Great! Check out your summary',
          trigger: 'review',
        },
        {
          id: 'review',
          component: <Review />,
          asMessage: true,
          trigger: 'update',
        },
        {
          id: 'update',
          message: 'Would you like to update some field?',
          trigger: 'update-question',
        },
        {
          id: 'update-question',
          options: [
            { value: 'yes', label: 'Yes', trigger: 'update-yes' },
            { value: 'no', label: 'No', trigger: 'end-message' },
          ],
        },
        {
          id: 'update-yes',
          message: 'What field would you like to update?',
          trigger: 'update-fields',
        },
        {
          id: 'update-fields',
          options: [
            { value: 'name', label: 'Name', trigger: 'update-name' },
            { value: 'gender', label: 'Gender', trigger: 'update-gender' },
            { value: 'age', label: 'Age', trigger: 'update-age' },
            { value: 'height', label: 'Height', trigger: 'update-height' },
            { value: 'weight', label: 'Weight', trigger: 'update-weight' },
          ],
        },
        {
          id: 'update-name',
          update: 'name',
          trigger: '9',
        },
        {
          id: 'update-gender',
          update: 'gender',
          trigger: '9',
        },
        {
          id: 'update-age',
          update: 'age',
          trigger: '9',
        },
        {
          id: 'update-height',
          update: 'height',
          trigger: '9',
        },
        {
          id: 'update-weight',
          update: 'weight',
          trigger: '9',
        },
        {
          id: 'end-message',
          message: 'Thanks! have a great day!',
          end: true,
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