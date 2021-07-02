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
          name: 'Introdução e Preparatório',
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
              videoURL: 'https://www.youtube.com/watch?v=UYXG1ZGeY0w',
              startLessonDate: new Date()
            },
            {
              id: 3,
              name: 'Abacate',
              videoURL: 'https://www.youtube.com/watch?v=Qj9SFHZF8tc',
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
              videoURL: 'https://www.youtube.com/watch?v=UYXG1ZGeY0w',
              startLessonDate: new Date()
            },
            {
              id: 3,
              name: 'Abacate',
              videoURL: 'https://www.youtube.com/watch?v=Qj9SFHZF8tc',
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
              videoURL: 'https://www.youtube.com/watch?v=UYXG1ZGeY0w',
              startLessonDate: new Date()
            },
            {
              id: 3,
              name: 'Abacate',
              videoURL: 'https://www.youtube.com/watch?v=Qj9SFHZF8tc',
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