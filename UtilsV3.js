(function(Scratch) {
  'use strict';

class Utilities {
    getInfo() {
      return {
        id: 'utilities',
        name: 'Utlities',

        color1: '#8BC34A',
        color2: '#7CB342',
        color3: '#689F38',

        menuIconURI: icon,

        blocks: [
          {
            opcode: 'utl2eval',

            blockType: Scratch.BlockType.COMMAND,

            text: 'JS [STRING]',
            arguments: {
			STRING: {
              type: "string",
              defaultValue: 'alert("gumble ro");'
            }
            }
          }
]
}
}
utl2eval({STRING}) {
	try{
	eval(STRING);
	}catch(e){utl2_evalerr=e}
  }

Scratch.extensions.register(new Utilities());
})(Scratch);
