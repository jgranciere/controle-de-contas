import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./style"


export default function HomeScreen({navigation}) {

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    return(
        <View style={{ flex: 1, backgroundColor: '#101E2B' }}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.viewAllMonths}>
                    {meses.map((mes, index) =>(
                        <TouchableOpacity key={index} style={styles.boxMonth} onPress={()=> navigation.navigate("Meses", {mes})}>
                            <Text style={styles.boxTextMonth}>{mes}</Text>
                            <Icon name="chevron-right" size={24} color="#9bccff"></Icon>
                        </TouchableOpacity>
                    ))}
                </View>  
            </ScrollView>
        </View>
    );
}
