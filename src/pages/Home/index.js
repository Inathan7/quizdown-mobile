import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

import styles from './styles';
import api from '../../services/api';

const Home = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params;

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        api.get('quizzes').then(response => {
            setQuizzes(response.data);
        });
    }, []);

    function handleNavigationToQuiz(quiz_id) {
        navigation.navigate('Quiz', {
            user_id: 1,
            quiz_id: quiz_id,
            jumps: 5,
            points: 180
        });
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.quizDownText}>
                    <Text style={styles.quizDownText}> QuizDown </Text>
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}> User </Text>
                    <Text style={styles.userInfoText}> Pontos: 100 </Text>
                </View>

                <View>
                    <TextInput style={styles.textInput}> <Text> Pesquisar </Text> </TextInput>
                </View>

                <View style={styles.quizListContainer}>
                    <ScrollView style={styles.quizList}>

                        {quizzes.map(quiz => (
                            <TouchableOpacity
                                onPress={() => {handleNavigationToQuiz(quiz.id)}}
                                key={String(quiz.id)}>
                                <Text style={styles.quizNameText}>{quiz.name}</Text>
                                <SvgUri width={300} height={300} uri={quiz.image_url}></SvgUri>
                                <Text style={styles.quizDescripitionText}>{quiz.description}</Text>
                            </TouchableOpacity>
                            
                        ))}

                    </ScrollView>
                </View>

            </View>
        </>
    );
}

export default Home;