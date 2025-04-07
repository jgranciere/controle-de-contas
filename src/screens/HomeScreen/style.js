import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1
    },
    boxMonth: {
        width: "90%",
        padding: 20,
        borderRadius: 50,
        backgroundColor: "#18313E",
        margin: 5,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
    },
    viewAllMonths: {
        alignItems: "center",
    },
    boxTextMonth: {
        fontSize: 20,
        color: "#fff",
        marginLeft: 10,
        letterSpacing: 2,
        textTransform: "uppercase"
    }
})

export default styles