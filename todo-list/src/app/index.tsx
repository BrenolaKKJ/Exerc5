import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";

import { useState } from "react";

export default function Home() {

  const [tarefa, setTarefa] = useState("");

  const [lista, setLista] = useState([
    {
      id:"1",
      nome:"Estudar React",
      concluida:false
    }
  ]);

  function adicionarTarefa() {

    if(tarefa === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now().toString(),
      nome: tarefa,
      concluida:false
    };

    setLista([...lista, novaTarefa]);

    setTarefa("");

  }

  function removerTarefa(id:string) {

    const novaLista = lista.filter(
      item => item.id !== id
    );

    setLista(novaLista);

  }

  function concluirTarefa(id:string) {

    const novaLista = lista.map(item => {

      if(item.id === id) {

        return {
          ...item,
          concluida: !item.concluida
        };

      }

      return item;

    });

    setLista(novaLista);

  }

  const concluidas = lista.filter(
    item => item.concluida
  ).length;

  return (

    <View
      style={{
        flex:1,
        backgroundColor:"black",
        paddingTop:50,
        padding:20
      }}
    >

      <Text
        style={{
          color:"white",
          fontSize:28,
          marginBottom:20
        }}
      >
        Tarefas concluídas: {concluidas}
      </Text>

      <TextInput
        placeholder="Digite uma tarefa"
        placeholderTextColor="gray"
        value={tarefa}
        onChangeText={setTarefa}
        style={{
          borderWidth:1,
          borderColor:"white",
          color:"white",
          padding:10,
          borderRadius:10,
          marginBottom:10
        }}
      />

      <TouchableOpacity
        onPress={adicionarTarefa}
        style={{
          backgroundColor:"green",
          padding:15,
          borderRadius:10,
          alignItems:"center",
          marginBottom:20
        }}
      >

        <Text style={{color:"white"}}>
          Adicionar
        </Text>

      </TouchableOpacity>

      <FlatList

        data={lista}

        keyExtractor={(item)=>item.id}

        renderItem={({item})=>(

          <View
            style={{
              borderWidth:1,
              borderColor:"white",
              padding:15,
              marginBottom:10,
              borderRadius:10
            }}
          >

            <Text
              style={{
                color: item.concluida
                ? "lime"
                : "white",

                textDecorationLine:
                item.concluida
                ? "line-through"
                : "none",

                fontSize:18,
                marginBottom:10
              }}
            >
              {item.nome}
            </Text>

            <TouchableOpacity

              onPress={() => concluirTarefa(item.id)}

              style={{
                backgroundColor:"blue",
                padding:10,
                borderRadius:10,
                marginBottom:10
              }}
            >

              <Text style={{color:"white"}}>
                Concluir
              </Text>

            </TouchableOpacity>

            <TouchableOpacity

              onPress={() => removerTarefa(item.id)}

              style={{
                backgroundColor:"red",
                padding:10,
                borderRadius:10
              }}
            >

              <Text style={{color:"white"}}>
                Remover
              </Text>

            </TouchableOpacity>

          </View>

        )}

      />

    </View>

  );
}