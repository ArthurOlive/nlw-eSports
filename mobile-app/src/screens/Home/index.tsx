import React, { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';

import { GAMES } from '../../utils/games'
import { Background } from '../../components/Background';

export function Home() {

  const [games, setgames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handOpenGame({id, title, bannerUrl} : GameCardProps) {
    navigation.navigate("game", {id, title, bannerUrl})
  }

  useEffect(() => {
    fetch('http://192.168.56.1:3000/games')
    .then(resp => resp.json())
    .then(data => setgames(data))

  })

  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <Image 
              source={logoImg}
              defaultSource={logoImg}
              style={styles.logo}
          />

          <Heading
            title='Encontre o seu duo!'
            subtitle='Selecione o que deseja jogar'
          />

          <FlatList
            contentContainerStyle={styles.contentList}
            data={games}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <GameCard data={item} onPress={() => handOpenGame(item)}/>
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          
      </SafeAreaView>
    </Background>
  );
}