const releaseNote = {
  nodes: [{
    name: 'div',
    children: [{
      name: 'h4',
      attrs: {
        style: 'text-align: center;'
      },
      children: [{
        type:'text',
        text:'更新日志'
      }]
    },
    {
        name: 'div',
        children: [{
          type: 'text',
          text: 'v1.1'
        },
        {
          name:'ul',
          children:[
            {
              name:'li',
              attrs: {
                style: 'font-size: 12px;'
              },
              children:[
                {
                  type: 'text',
                  text: '增加更新日志'
                }
              ]
            },
            {
              name: 'li',
              attrs: {
                style: 'font-size: 12px;'
              },
              children: [
                {
                  type: 'text',
                  text: '增加帮助'
                }
              ]
            },
          ]
        }]
      }, 
      {
        name: 'div',
        children: [{
          type: 'text',
          text: 'v1.0'
        },
        {
          name: 'ul',
          children: [
            {
              name: 'li',
              attrs: {
                style: 'font-size: 12px;'
              },
              children: [
                {
                  type: 'text',
                  text: '支持游客创建剪切板及查询功能。'
                }
              ]
            }
          ]
        }]
      }
    ]
  }]
}

module.exports = releaseNote;