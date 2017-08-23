export default {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    greeting: {
        flex: '0 0 auto',
        height: '7vw',
        fontSize: '5vw',
        textAlign: 'center',
        verticalAlign: 'middle',
        margin: '0'
    },
    chatList: {
        flex: '1 1 auto',
        overflowX: 'hidden',
        overflowY: 'scroll'
    },
    chatElement: {
        display: 'flex',
        flexDirection: 'row'
    },
    chatSender: {
        flex: '0 0 auto',
        width: '20vmin',
        fontSize: '3vmin',
        wordWrap: 'break-word'
    },
    chatContent: {
        flex: '1 1 auto',
        minWidth: '0',
        fontSize: '3vmin',
        wordWrap: 'break-word'
    },
    chatDate: {
        flex: '0 0 auto',
        width: '38vmin',
        fontSize: '3vmin'
    },
    chatForm: {
        flex: '0 0 auto',
        height: '5vmin',
        display: 'flex',
        flexDirection: 'row'
    },
    senderInput: {
        flex: '0 0 auto',
        width: '25vmin',
        fontSize: '3vmin'
    },
    contentInput: {
        flex: '1 1 auto',
        fontSize: '3vmin'
    }
};
