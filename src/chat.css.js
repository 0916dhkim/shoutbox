export default {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    greeting: {
        flex: '0 0 auto',
        height: '100px',
        fontSize: '80px',
        textAlign: 'center',
        verticalAlign: 'middle',
        margin: '0'
    },
    chatList: {
        flex: '1 1 auto',
        overflowX: 'hidden',
        overflowY: 'scroll'
    },
    chatForm: {
        flex: '0 0 auto',
        height: '30px'
    }
};
