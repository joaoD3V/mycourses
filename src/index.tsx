import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

import './styles/global.scss';

createServer({
  models: {
    module: Model,
  },

  seeds(server){
    server.db.loadData({
      modules: [
        {
          id: 1,
          name: 'Introdução e Preparatório ao sistema financeiro e interesse compartilhados e únicos para compartilhamento',
          lessons: [
            {
              id: 1,
              name: 'Melancia',
              videoURL: 'https://www.youtube.com/embed/mq-mM8UdEDM',
              startLessonDate: new Date()
            },
            {
              id: 2,
              name: 'Cacto',
              videoURL: 'https://www.youtube.com/embed/v4-oN2yQ8Dw',
              startLessonDate: new Date()
            },
            {
              id: 3,
              name: 'Introdução e Preparatório ao sistema financeiro e interesse compartilhados e únicos para compartilhamento',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 4,
              name: 'Pêra',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 5,
              name: 'Uva',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 6,
              name: 'Maçã',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 7,
              name: 'Amora',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 8,
              name: 'Goiaba',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 9,
              name: 'Passas',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 10,
              name: 'Melão',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
          ]
        },
        {
          id: 2,
          name: 'Conceitos de Sistemas',
          lessons: [
            {
              id: 1,
              name: 'Melancia',
              videoURL: 'https://www.youtube.com/embed/mq-mM8UdEDM',
              startLessonDate: new Date()
            },
            {
              id: 2,
              name: 'Cacto',
              videoURL: 'https://www.youtube.com/embed/v4-oN2yQ8Dw',
              startLessonDate: new Date()
            },
            {
              id: 3,
              name: 'Abacate',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
            {
              id: 4,
              name: 'Banana',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
          ]
        },
        {
          id: 3,
          name: 'Infraestrutura',
          lessons: [
            {
              id: 1,
              name: 'Melancia',
              videoURL: 'https://www.youtube.com/embed/mq-mM8UdEDM',
              startLessonDate: new Date()
            },
            {
              id: 2,
              name: 'Cacto',
              videoURL: 'https://www.youtube.com/embed/v4-oN2yQ8Dw',
              startLessonDate: new Date()
            },
            {
              id: 3,
              name: 'Abacate',
              videoURL: 'https://www.youtube.com/embed/9iAoMayWblo',
              startLessonDate: new Date()
            },
          ]
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/modules', () => {
      return this.schema.all('module')
    });

    this.post('/modules', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('module', data);
    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);