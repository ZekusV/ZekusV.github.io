let localStorage_ID = undefined;

(function(Scratch) {
  'use strict';
  class MyExtension {
    getInfo () {
      return { 
        // `id` is the internal ID of the extension
        // It should never change!
        // If you choose to make an actual extension, please change this to something else.
        // Only the characters a-z and 0-9 can be used. No spaces or special characters.
        id: 'localstorage',
  
        // `name` is what the user sees in the toolbox
        // It can be changed without breaking projects.
        name: 'Local Storage',
  
        color1: '#BB1111',
  
        blocks: [
          {
            opcode: 'a',
            blockType: Scratch.BlockType.COMMAND,
            text: 'local ID[ONE]',
            arguments: {
                ONE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'ID'
                }
            }
          },
          {
            opcode: 'b',
            blockType: Scratch.BlockType.REPORTER,
            text: 'local ID',
          },
          {
              opcode: 'c',
              blockType: Scratch.BlockType.COMMAND,
              text: 'local set item[ONE][TWO]',
              arguments: {
                  ONE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'KEY'
                  },
                  TWO: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'VALUE'
                  }
              }
          },
          {
              opcode: 'd',
              blockType: Scratch.BlockType.REPORTER,
              text: 'local get Item[ONE]',
              arguments: {
                  ONE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'KEY'
                  }
              }
          },
          {
            opcode: 'e',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'local get Item[ONE]',
            arguments: {
                ONE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'KEY'
                }
            }
        },
          {
            opcode: 'f',
            blockType: Scratch.BlockType.COMMAND,
            text: 'local remove item[ONE]',
            arguments: {
                ONE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'KEY'
                }
            }
        },
        {
          opcode: 'g',
          blockType: Scratch.BlockType.COMMAND,
          text: 'local remove ALL'
        }
        ]
      };
    }
    a(args){
      localStorage_ID = args.ONE;
      return;
    }
    b(args){
      return localStorage_ID;
    }
    c(args) {
      localStorage.setItem(localStorage_ID+args.ONE, args.TWO);
      return;
    }
    d(args) {
      return localStorage.getItem(localStorage_ID+args.ONE);
    }
    e(args){
      return localStorage.getItem(localStorage_ID+args.ONE);
    }
    f(args){
      localStorage.removeItem(localStorage_ID+args.ONE);
      return;
    }
    g(){
      localStorage.clear();
      return;
    }
  }
  Scratch.extensions.register(new MyExtension());
})(Scratch);
