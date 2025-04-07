import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, useWindowDimensions  } from "react-native";
import styles from "./style"
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



export default function DetailsScreen({ route, navigation }) {

    const { mes } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [nomeConta, setNomeConta] = useState("");
    const [valorConta, setValorConta] = useState("");
    const [contas, setContas] = useState([]);

    const [contaSelecionada, setContaSelecionada] = useState(null);
    const [modalContaVisible, setModalContaVisible] = useState(false);

    const total = contas.reduce((acc, conta) => acc + conta.valor, 0);
    const totalPago = contas.filter(c => c.pago).reduce((acc,c) => acc + c.valor,0);
    const totalPendente = contas.filter(c => !c.pago).reduce((acc,c) => acc + c.valor,0);

    useEffect(() => {
        const carregarContas = async () => {
          const data = await AsyncStorage.getItem(`contas_${mes}`);
          if (data) {
            try {
              const parsed = JSON.parse(data);
              if (Array.isArray(parsed) && parsed.every(item => typeof item === 'object' && 'nome' in item && 'valor' in item)) {
                setContas(parsed);
              } else {
                // dados inválidos, limpa tudo pra evitar erro
                await AsyncStorage.removeItem(`contas_${mes}`);
                setContas([]);
              }
            } catch (e) {
              console.error("Erro ao carregar contas:", e);
              setContas([]);
            }
          }
        };
      
        carregarContas();
      }, [mes]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: mes
        });
    }, [navigation, mes]);

    const { width } = useWindowDimensions();
    const isSmallScreen = width < 350;

    return (
        <View style={{ flex: 1, backgroundColor: '#101E2B', alignItems:"center" }} >
            <View style={styles.viewStyle}>
                <View style={styles.viewBoxContas}>
                    <Text style={styles.textViewBoxContas}>Adicionar Conta </Text>
                    <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                        <Icon name="add-circle" size={30} color="#9bccff" />
                    </TouchableOpacity>   
                </View>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"    
            >

                <View style={styles.viewModalStyle}>

                    <View style={styles.viewModalStyleInfos}>
                        <View style={{marginBottom:20}}>
                            <Text style={styles.modalText}>Nome da conta</Text>
                            <TextInput style={styles.modalTextInput} placeholder="Ex: Nubank" placeholderTextColor="rgba(160, 160, 160, 0.26)" value={nomeConta} onChangeText={setNomeConta}></TextInput>
                        </View>


                        <View style={{marginBottom:20}}>
                            <Text style={styles.modalText}>Valor da Conta</Text>
                            <TextInput style={styles.modalTextInput} placeholder="Ex: 1000,00" placeholderTextColor="rgba(160, 160, 160, 0.26)"keyboardType="numeric" value={valorConta} onChangeText={(text) =>{
                                const onlyNums = text.replace(/\D/g, '');
                                const float = (parseFloat(onlyNums) / 100).toFixed(2);
                                setValorConta(float.replace('.',','));
                            }}></TextInput>
                        </View>

                        <TouchableOpacity
                            onPress={async() =>{
                                if (nomeConta && valorConta) {
                                    const novaConta = {
                                        nome: nomeConta,
                                        valor: parseFloat(valorConta.replace(',','.'))
                                    };
                                    const novaLista = [...contas, novaConta];
                                    setContas(novaLista);

                                    await AsyncStorage.setItem(`contas_${mes}`, JSON.stringify(novaLista));

                                    setNomeConta('');
                                    setValorConta('');
                                    setModalVisible(false);
                                }
                            }}
                            style={styles.modalBottomAdd}
                        >
                            <Text style={{color:"#101E2B", textTransform:"uppercase"}}>adicionar</Text>

                        </TouchableOpacity>

                        <TouchableOpacity  style={styles.modalBottomCancel} onPress={() => setModalVisible(false)}>
                            <Text style={{color:"#fff", textTransform:"uppercase"}}>cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
            </Modal>



            <Modal
                visible={modalContaVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.viewModalStyle}>
                    <View style={styles.viewModalStyleInfosContas}>
                        <View style={{borderBottomWidth:1,borderBottomColor: 'rgba(255, 255, 255, 0.1)',}}>
                            <Text style={styles.modalText}>Conta: {contaSelecionada?.nome}</Text>
                            <Text style={styles.modalText}>Valor: R$ {contaSelecionada?.valor?.toFixed(2)}</Text>
                        </View>
                        

                        <View style={styles.buttonsModalContas}>

                        <TouchableOpacity style={styles.modalBottomCancelChange}
                                onPress={()=>{
                                    setModalContaVisible(false);
                                }}
                                >
                                <Text style={{fontSize: isSmallScreen ? 12 : 14, color:"#fff"}} numberOfLines={1} adjustsFontSizeToFit>Voltar</Text>                  
                            </TouchableOpacity>

                       

                            <TouchableOpacity style={styles.modalButtomExcluir}
                                onPress={async () => {
                                    const novaLista = contas.filter((c) => c !== contaSelecionada);
                                    setContas(novaLista);
                                    await AsyncStorage.setItem(`contas_${mes}`, JSON.stringify(novaLista));
                                    setModalContaVisible(false);
                                }}
                        
                                >
                                <Icon name="delete" size={24} color="red" />

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalBottomPago}
                                onPress={async () => {
                                    const novaLista = contas.map((c) =>
                                    c.nome === contaSelecionada.nome && c.valor === contaSelecionada.valor
                                        ? {
                                            ...c,
                                            pago: true,
                                            dataPagamento: new Date().toISOString()
                                        }
                                        : c
                                    );

                                    setContas(novaLista);
                                    await AsyncStorage.setItem(`contas_${mes}`, JSON.stringify(novaLista));
                                    setModalContaVisible(false);
                                }}
                                >
                                <Text style={[styles.modalTextStyle, {fontSize: isSmallScreen ? 12 : 14}]} numberOfLines={1} adjustsFontSizeToFit>Pago</Text>
                            </TouchableOpacity>        
                        </View>

              

                        <TouchableOpacity
                            style={styles.modalDesmarcarPago}
                            onPress={async () => {
                                const novaLista = contas.map((conta) =>
                                conta === contaSelecionada
                                    ? { ...conta, pago: false, dataPagamento: null }
                                    : conta
                                );

                                setContas(novaLista);
                                await AsyncStorage.setItem(`contas_${mes}`, JSON.stringify(novaLista));
                                setModalContaVisible(false);
                            }}
                            >

                            <Text style={{ color: "rgba(160, 160, 160, 0.78)", padding:10}}>Desmarcar como pago</Text>
                        </TouchableOpacity>

                    </View>                 
                </View>
                
            </Modal>

            <View style={{flex:1, backgroundColor: '#101E2B', marginBottom:20}}>
                <View style={styles.viewStyleContasPendentes}>
                    <ScrollView>
                        {contas.map((conta, index) =>(
                            <TouchableOpacity key={index} style={[styles.viewContasAdicionadas]} onPress={()=> {
                                setContaSelecionada(conta);
                                setModalContaVisible(true);
                            }}>

                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.textContasAdicionads, {fontSize: isSmallScreen ? 12 : 14}]} numberOfLines={1} adjustsFontSizeToFit>
                                        {(conta.nome?.length > 15 ? conta.nome.slice(0, 15) + '...' : conta.nome) || 'Sem nome'}
                                    </Text>

                                    {conta.pago && conta.dataPagamento && (
                                        <Text style={styles.textDataPagamentos}>
                                            Pago em: {new Date(conta.dataPagamento).toLocaleDateString('pt-BR')}
                                        </Text>
                                    )}
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.textContasAdicionads, {fontSize: isSmallScreen ? 12 : 14}]} numberOfLines={1} adjustsFontSizeToFit>
                                        R$ {conta.valor.toFixed(2)}
                                    </Text>

                                    {conta.pago && (
                                        <FontAwesome
                                        name="check-square"
                                        size={16}
                                        color="green"
                                        style={{ marginLeft: 8 }}
                                        />
                                    )}

                                    {!conta.pago && (
                                        <FontAwesome
                                        name="clock-o"
                                        size={16}
                                        color="#9bccff"
                                        style={{ marginLeft: 8 }}
                                        />
                                    )}
                                </View>        
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.viewBoxValorTotal}>
                
                <View style={styles.viewInfoValorTotal}>
                    <Text style={styles.textViewBoxContasPendente}>Total pendente:</Text>
                    <Text style={styles.textViewBoxContasPendente}>R$ {totalPendente.toFixed(2)}</Text>
                </View>

                <View style={styles.viewInfoValorTotal}>
                    <Text style={styles.textViewBoxContasPago}>Total Pago:</Text>
                    <Text style={styles.textViewBoxContasPago}>R$ {totalPago.toFixed(2)}</Text>
                </View>

                <View style={styles.viewInfoValorTotal}>
                    <Text style={[styles.textViewBoxContas, {fontSize:isSmallScreen ? 12 : 16}]} numberOfLines={1} adjustsFontSizeToFit>Total:</Text>
                    <Text style={styles.textViewBoxContas}>R$ {total.toFixed(2)}</Text>
                </View> 

            </View>
        </View>

    );
}
