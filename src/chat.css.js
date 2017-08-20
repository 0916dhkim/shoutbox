export default {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    greeting: {
        flex: '0 0 auto',
        height: '50px',
        fontSize: '40px',
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
        flex: '0 0 10em'
    },
    chatContent: {
        flex: '1 1 auto',
        minWidth: '0'
    },
    chatDate: {
        flex: '0 0 16em'
    },
    chatForm: {
        flex: '0 0 auto',
        height: '30px',
        display: 'flex',
        flexDirection: 'row'
    },
    senderInput: {
        flex: '1 1 auto'
    },
    contentInput: {
        flex: '6 6 auto'
    }
};
