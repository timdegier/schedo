import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 2,
        backgroundColor: '#fff',
    },
    homeView: {
        flex: 2,
        marginTop: 40,
        borderRadius: 10,
    },
    viewNote: {
        flex: 2,
        marginTop: 40,
        backgroundColor: '#fff',
    },
    homeImage: {
        flex: 2,
    },
    topper: {
        margin: 10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#1CA2ED',
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 30,
        paddingRight: 30,
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius: 10,
    },
    topperAccount: {
        margin: 10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#00b0ff',
        padding: 30,
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius: 10,
    },
    topper2: {
        width: Dimensions.get('window').width - 20,
        fontWeight: '700',
        fontSize: 24,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 50,
        margin: 25,
    },
    topper3: {
        margin: 10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#00b0ff',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius: 10,
    },
    topper4: {
        margin: 10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        fontWeight: 'bold',
        fontSize: 24,
        borderRadius: 10,
    },
    topperBackground: {
        width: Dimensions.get('window').width - 20,
        margin: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 50,
        paddingTop: 50,
    },
    input: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f6f6f6',
    },
    button: {
        backgroundColor: '#00b0ff',
        color: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    buttonAdd: {
        backgroundColor: '#00b0ff',
        color: '#fff',
        padding: 20,
        fontSize: 24,
        margin: 0,
        marginTop: 25,
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
    },
    buttonBack: {
        backgroundColor: '#ff1744',
        color: '#fff',
        padding: 20,
        fontSize: 24,
        margin: 10,
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
    },
    note: {
        margin: 10,
        marginTop: 0,
        padding: 20,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },
    noteView: {
        margin: 10,
        padding: 30,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },
    h1: {
        fontSize: 25,
        fontWeight: '500',
        marginLeft: 25,
        margin: 30,
        marginBottom: 15
    },
    h1_white: {
        fontSize: 25,
        fontWeight: '500',
        marginLeft: 25,
        margin: 30,
        color: 'white',
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 20,
        marginBottom: 20,
    },
    removeButton: {
        backgroundColor: '#ff1744',
        color: '#fff',
        padding: 10,
        fontSize: 24,
        borderRadius: 10,
        marginLeft: 5,
        textAlign: 'center',
        alignItems: 'center',
    },
    viewButton: {
        backgroundColor: '#00b0ff',
        color: '#fff',
        padding: 10,
        marginRight: 5,
        borderRadius: 10,
        textAlign: 'center',
        alignItems: 'center',
    },
    cardTopper: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#00b0ff'
    },  
    alert: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },  
  });
  
export default styles;