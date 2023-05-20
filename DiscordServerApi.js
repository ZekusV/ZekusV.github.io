const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

class DiscordExtension {
  constructor (runtime) {
    this.runtime = runtime;
    // The current server ID
    this.serverId = null;
    // The data for the current server
    this.serverData = null;
  }

  getInfo () {
    return {
      id: 'discord',
      name: 'Discord',
      blocks: [
        {
          opcode: 'setServerId',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'discord.setServerId',
            default: 'set server ID to [ID]',
            description: 'Sets the server ID to use for fetching data'
          }),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'fetchServerData',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'discord.fetchServerData',
            default: 'fetch data for server [ID]',
            description: 'Fetches data for a server using its ID'
          }),
          arguments: {
            ID: {
              type: ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'getServerName',
          blockType: BlockType.REPORTER,
          text: formatMessage({
            id: 'discord.getServerName',
            default: 'server name',
            description: 'Reports the name of the current server'
          })
        },
        {
          opcode: 'getMemberCount',
          blockType: BlockType.REPORTER,
          text: formatMessage({
            id: 'discord.getMemberCount',
            default: 'member count',
            description: 'Reports the number of members in the current server'
          })
        },
        {
          opcode: 'getMembersOnline',
          blockType: BlockType.REPORTER,
          text: formatMessage({
            id: 'discord.getMembersOnline',
            default: 'members online',
            description: 'Reports the number of members online in the current server'
          })
        }
      ],
      menus: {}
    };
  }

  // Sets the server ID to use for fetching data
  setServerId (args) {
    this.serverId = args.ID;
  }

  // Fetches data for a server using its ID
  fetchServerData (args) {
    const id = args.ID || this.serverId;
    if (!id) {
      log.warn('No server ID provided');
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://discord.com/api/guilds/${id}/widget.json`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.serverData = data;
      } else {
        log.error(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      log.error(xhr.statusText);
    };
    xhr.send();
  }

  // Reports the name of the current server
  getServerName () {
    if (this.serverData) {
      return this.serverData.name;
    }
    return '';
  }

  // Reports the number of members in the current server
  getMemberCount () {
    if (this.serverData) {
      return this.serverData.members.length;
    }
    return 0;
  }

  // Reports the number of members online in the current server
  getMembersOnline () {
    if (this.serverData) {
      return this.serverData.members.filter(m => m.status === 'online').length;
    }
    return 0;
  }
}

Scratch.extensions.register(new DiscordExtension());
