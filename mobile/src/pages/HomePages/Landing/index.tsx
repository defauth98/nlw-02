import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../../services/api';
import styles from './styles';

import landingImg from '../../../assets/images/landing.png';
import studyIcon from '../../../assets/images/icons/study.png';
import giveClassesIcon from '../../../assets/images/icons/give-classes.png';
import heartIcon from '../../../assets/images/icons/heart.png';
import { useAuth } from '../../../contexts/auth';

function Landing() {
  const navigation = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });

    console.log(user);
  }, []);

  function handleNavigateToClassesPage() {
    navigation.navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigation.navigate('StudyTabs');
  }

  // function handleSignOut() {
  //   signOut();
  // }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon}></Image>

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => {
            handleNavigateToClassesPage();
          }}
        >
          <Image source={giveClassesIcon}></Image>

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
