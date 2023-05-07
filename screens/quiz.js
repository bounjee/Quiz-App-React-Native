import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

const shuffleArray=(array)=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const Quiz = ({navigation}) => {
    const [questions,setQuestions] = useState()
    const [questionsNumber,setQuestionsNumber] = useState(0)
    const [options,setOptions] = useState([])
    const [score,setScore] = useState(0)
    const [isLoading, setIsLoading] = useState(false)



    const getQuiz= async() => {
        setIsLoading(true)
        const url = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986'
        const res = await fetch(url);
        const data = await res.json();
        setQuestions(data.results)
        setOptions(data.results)
        setOptions(generateOptionsAndShuffle(data.results[0]))
        setIsLoading(false)
        
    }
    useEffect(() => {
        getQuiz()
    },[]);

    const handleNextPress= () => {
        setQuestionsNumber(questionsNumber + 1)
        setOptions(generateOptionsAndShuffle(questions[questionsNumber+1]))
    }
    
    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers]
        options.push(_question.correct_answer)
        shuffleArray(options)

        return  options

    }
    
    const handleSelectedOptions= (_option) => {
        if ( _option === questions[questionsNumber].correct_answer) {
            setScore(score + 1)
        }
        if (questionsNumber !== 9) { 
            setQuestionsNumber(questionsNumber + 1)
            setOptions(generateOptionsAndShuffle(questions[questionsNumber+1]))
        }
        if (questionsNumber === 9 ) {
            handleShowResult()
        }


    }

    const handleShowResult = () => {
        navigation.navigate('Result',{
            score: score
        })
    }

  return (
    <View style={styles.container}>
     {isLoading ? <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Text>LOADING...</Text>
     </View> :  questions && 
     <View style={styles.parent}>
         <View style={styles.top}>
        <Text style={styles.questionText}>
            {decodeURIComponent( questions[questionsNumber].question)}
        </Text> 
      </View>
      <View style={styles.options}>
      <TouchableOpacity style={styles.optionButtom} onPress={() =>handleSelectedOptions(options[0])}>
        <Text style={styles.optionText}>{decodeURIComponent(options[0])}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButtom} onPress={() =>handleSelectedOptions(options[1])}>
        <Text style={styles.optionText}>{decodeURIComponent(options[1])}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButtom} onPress={() =>handleSelectedOptions(options[2])}>
        <Text style={styles.optionText}>{decodeURIComponent(options[2])}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButtom}onPress={() =>handleSelectedOptions(options[3])} >
        <Text style={styles.optionText}>{decodeURIComponent(options[3])}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
                PREV
            </Text>
        </TouchableOpacity>
{questionsNumber !== 9  &&         <TouchableOpacity onPress={handleNextPress} style={styles.button}>
            <Text style={styles.buttonText} >
                SKIP
            </Text>
        </TouchableOpacity>}

        {questionsNumber === 9  &&         <TouchableOpacity onPress={handleShowResult} style={styles.button}>
            <Text style={styles.buttonText} >
                END
            </Text>
        </TouchableOpacity>}
       
      </View>
      </View>}
      
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        paddingHorizontal:20,
        height:'100%'
    },
    top:{
        marginVertical:16,
    },
    options:{
        marginVertical:16,
        flex:1,
    },
    bottom:{
        marginBottom:12,
        paddingVertical:16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button:{
        backgroundColor: '#004E98',
        padding:14,
        paddingHorizontal:20,
        borderRadius:4,
        alignItems: 'center',
        marginBottom:25,
        color:'#EBEBEB'
    },
    buttonText:{
        fontSize:16,
        fontWeight: '500',
        color: '#EBEBEB'
    },
    questionText:{
        fontSize:28,
    },
    optionText:{
        fontSize:18,
        fontWeight:'500',
        color:'#EBEBEB'
    },
    optionButtom:{
        paddingVertical:12,
        marginVertical:6,
        backgroundColor:'#FF6700',
        alignItems:'center',
        borderRadius:4,
    },
    parent:{
        height:'100%'
    }
})