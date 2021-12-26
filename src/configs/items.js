export const items = [
  {
    index: 0,
    type: 'shape',
    id: 'A',
    dim: {
      w: 150,
      h: 50,
    },
    pos: {
      x: 475,
      y: 175,
    },
    text: {
      data: 'Internet',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#fef72f',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 1,
    type: 'shape',
    id: 'Z',
    dim: {
      w: 150,
      h: 50,
    },
    pos: {
      x: 575,
      y: 475,
    },
    text: {
      data: 'HTML',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#fef72f',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 2,
    type: 'smart-connection',
    form: 'linear',
    id: '0',
    from: {
      id: 'A',
    },
    to: {
      id: 'Z',
    },
    className: 'main',
  },
  {
    index: 3,
    type: 'shape',
    id: 'B',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 100,
      y: 100,
    },
    text: {
      data: 'How does the Internet work?',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 4,
    type: 'shape',
    id: 'C',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 100,
      y: 175,
    },
    text: {
      data: 'What is HTTP?',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 5,
    type: 'shape',
    id: 'D',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 100,
      y: 250,
    },
    text: {
      data: 'Browsers and how they work?',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 6,
    type: 'smart-connection',
    form: 'linear',
    id: 'E',
    from: {
      id: 'A',
    },
    to: {
      id: 'B',
    },
    className: 'sub',
  },
  {
    index: 7,
    type: 'smart-connection',
    form: 'linear',
    id: 'F',
    from: {
      id: 'A',
    },
    to: {
      id: 'C',
    },
    className: 'sub',
  },
  {
    index: 8,
    type: 'smart-connection',
    form: 'linear',
    id: 'G',
    from: {
      id: 'A',
    },
    to: {
      id: 'D',
    },
    className: 'main',
  },
  {
    index: 9,
    type: 'shape',
    id: 'H',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 750,
      y: 100,
    },
    text: {
      data: 'DNS and how it works?',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 10,
    type: 'shape',
    id: 'I',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 750,
      y: 175,
    },
    text: {
      data: 'What is Domain Name?',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 11,
    type: 'shape',
    id: 'J',
    dim: {
      w: 250,
      h: 50,
    },
    pos: {
      x: 750,
      y: 250,
    },
    text: {
      data: 'What is hosting?',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#f7df97',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  },
  {
    index: 12,
    type: 'smart-connection',
    form: 'bezier',
    id: '1',
    from: {
      id: 'A',
    },
    to: {
      id: 'H',
    },
    className: 'sub',
  },
  {
    index: 13,
    type: 'smart-connection',
    form: 'bezier',
    id: '2',
    from: {
      id: 'A',
    },
    to: {
      id: 'I',
    },
    className: 'sub',
  },
  {
    index: 14,
    type: 'smart-connection',
    form: 'bezier',
    id: '3',
    from: {
      id: 'A',
    },
    to: {
      id: 'J',
    },
    className: 'main',
  },
];

export function template(id, x, y, i) {
  return {
    type: 'shape',
    id: id,
    dim: {
      w: 150,
      h: 50,
    },
    pos: {
      x: x,
      y: y,
    },
    index: i,
    text: {
      data: '',
      style: {
        bold: false,
        fontFamily: 'Inter',
        fontSize: '16',
        italic: false,
        underline: false,
        strikethrough: false,
        align: 'center',
        alignVertical: 'center',
        color: '#27262b',
      },
    },
    style: {
      backgroundColor: '#fef72f',
      borderColor: '#27262b',
      borderSize: '2',
      borderOpacity: '10',
      opacity: '9',
    },
  };
}
