import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor:"#101E2B",
        alignItems:"center",
        justifyContent:"center",
    },
    viewBoxContas: {
        width: "90%",
        padding: 20,
        backgroundColor: "#18313E",
        borderRadius: 50,
        flexDirection:"row",
        justifyContent: "space-between",
        display:"flex",
        alignItems:"center",
        marginBottom:20
    },
    textViewBoxContas: {
        fontSize: 18,
        color: "#fff",
        letterSpacing: 1,
        fontWeight: "bold",
        textAlign: "center",
    },

    textViewBoxContasPendente: {
        fontSize: 15,
        color: "#ffccaa",
        fontWeight: "500",
      },

    textViewBoxContasPago: {
        fontSize: 15,
        color: "#aaffaa",
        fontWeight: "500",
    },

/*CONTA PAGAS OU NAO*/

    viewStyleContasPendentes: {
        backgroundColor:"#18313E",
        alignItems:"center",
        justifyContent:"center",
        width:"85%",
        height: "auto",

    },

    viewContasAdicionadas: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
        paddingVertical: 12,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      },
      
    textContasAdicionads: {
        fontSize:15,
        color:"#fff",
        fontWeight:"bold",
        textTransform:"uppercase",
    },

/*TOTAL */

    viewBoxValorTotal: {
        width: "100%",
        backgroundColor: "#18313E",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 8,
    },

    viewInfoValorTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 8,
      },
    

/*MODAL STYLE*/

    viewModalStyle: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    modalText: {
        color:"#fff",
        fontSize:20,
        marginBottom:10,
        
    },

    modalTextInput: {
        width:"100%",
        padding:10,
        backgroundColor:"#18313E",
        color:"#fff",
        borderRadius:20,

    },

    viewModalStyleInfos: {
        width: "80%",
        backgroundColor: "#101E2B",
        borderRadius: 20,
        padding: 20,
    },

    modalBottomAdd: {
        alignItems:"center",
        backgroundColor:"#00f774",
        padding:10,
        borderRadius:20,
        marginBottom:10
    },

    modalBottomCancel: {
        alignItems:"center",
        backgroundColor:"#ff4747",
        padding:10,
        borderRadius:20,
    },
/*MODAL CONTAS ADICONADAS*/

    viewModalStyleInfosContas: {
        width: "90%",
        backgroundColor: "#101E2B",
        borderRadius: 20,
        padding: 20, 
    },

    buttonsModalContas: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width: "100%",
        marginBottom:20,
        marginTop:30,
        
    },

    modalBottomPago: {
        backgroundColor:"#00f774",
        flex:1,
        alignItems:"center",
        padding:10,
        borderRadius:50,
    },

    modalButtomExcluir: {
        backgroundColor: 'rgba(255, 0, 0, 0.28)',
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        marginHorizontal:10
    },

    modalBottomCancelChange: {
        alignItems:"center",
        backgroundColor:"rgb(117, 117, 117)",
        padding:10,
        borderRadius:20,
        flex:1
    },

    modalDesmarcarPago: {
        alignItems:"center",
    },

    modalTextStyle: {
        fontSize:10,
    },

    textDataPagamentos: {
        color: '#aaffaa',
        fontSize: 12,
        marginTop: 4,
    },
    iconModal: {
        marginLeft:10,
    }

})

export default styles