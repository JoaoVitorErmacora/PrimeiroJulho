import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';

//Import reanimated
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';

//import axios
import axios from "axios";

const { width } = Dimensions.get("screen");
const imageWidth = width * 0.7;
const imageHeight = imageWidth * 1.76;
const spacing = 12;

function Photo({ item, index, scrollX }) {
  const estilos = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollX.value, [index - 1, index, index + 1], [1.6, 1, 1.6])
        },
        {
          rotate: `${interpolate(scrollX.value, [index - 1, index, index + 1], [15, 1, -15])}deg`
        }
      ]
    }
  })

  console.log(index);

  return (
    <View style={{ width: imageWidth, height: imageHeight, overflow: 'hidden', borderRadius: 20 }}>
      <Animated.Image source={{ uri: item.Poster }} style={[{ flex: 1 }, estilos]} />
    </View>
  )
}
function BackdropPhoto({ pages, index, scrollX }) {
  const estilos = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0])
    }
  })

  return (
    <Animated.Image source={{ uri: pages.Poster }} style={[StyleSheet.absoluteFillObject, estilos]} blurRadius={20} />
  )
}

export default function App() {
  const [data, setData] = useState([]);

  //useSharedValue => reativo as animacoes, quando o nosso scrollX.value for alterado
  //todas as animacoes serao alteradas
  const scrollX = useSharedValue(0);
  // useAnimatedScrollHandler => hook do reanimated, que serve para "escutar" o evento de
  //rolagem (onScroll) da nossa lista
  const onScroll = useAnimatedScrollHandler((e) => {
    //e.contentOffset.x => Distancia em pixels que a lista ja foi rolada na horizontal
    scrollX.value = e.contentOffset.x / (imageWidth + spacing);
  })

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=Batman&page=2&&apikey=b07bc42e`,
      );
      setData(res.data.Search.slice(0, 10));
      console.log(res.data)
    } catch (error) {
      console.log("Erro ao buscar as imagens>", error)
    }
  }

  if (data.Poster === 0) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* position: absolute, bottom: 0, top: 0, left: 0, right: 0 */}
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((pages, index) => (
          <BackdropPhoto key={index} pages={pages} index={index} scrollX={scrollX} />
        ))}
      </View>

      <Animated.FlatList
        data={data}
        keyExtractor={(item) => String(item.imdbID)}
        horizontal
        //style={{flexGRW: 0}}
        style={{ flexGrow: 0 }}
        snapToInterval={imageWidth + spacing}
        //snapToInterval => faz com que a rolagem pare exatamente a cada intervalo espeificado
        //neste caso, o tamanho, o tamanho da imagem, mais o gap(spacing)
        decelerationRate={"fast"}
        // delecerationRate=> controla a velocidade da desaceleração da nossa rolagem
        contentContainerStyle={{
          gap: spacing,
          paddingHorizontal: (width - imageWidth) / 2
        }}
        //contentContainerStyle => aplicar estilo no conteudo interno do nosso flatlist
        renderItem={({ item, index }) => (
          <Photo item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={onScroll}
        //onScroll =>
        scrollEventThrottle={16}
        //scrollEventThrottle => DEFINE A FREQUENCIA QUE O EVENTO onScroll É CHAMADO (60FPS)
        showsHorizontalScrollIndicator={false}
      //remove indicador
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
