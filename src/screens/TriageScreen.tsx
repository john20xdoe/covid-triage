import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SimpleSurvey } from 'react-native-simple-survey';

import { COLORS, GREEN, PURPLE } from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { survey } from '../constants/Survey';

export default class TriageScreen extends React.Component {
  public static navigationOptions = () => {
    return {
      headerStyle: {
        height: 40,
        elevation: 5
      },
      headerTintColor: '#fff',
      headerTitle: 'Triage Symptoms',
      headerTitleStyle: {
        flex: 1
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = { answersSoFar: '' };
  }

  public onSurveyFinished(answers) {
    /**
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     *
     *  Answers are returned in an array, of the form
     *  [
     *  {questionId: string, value: any},
     *  {questionId: string, value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *
     *  As an example
     *  {
     *      questionId: "favoritePet",
     *      value: {
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a
     *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */

    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }

    this.props.navigation.navigate('SurveyCompleted', {
      surveyAnswers: answersAsObj
    });
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
   *  is restricted (age, geo-fencing) from your app.
   */
  public onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2)
    });
    switch (answer.questionId) {
      case 'favoriteColor': {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({ backgroundColor: answer.value.toLowerCase() });
        }
        break;
      }
      default:
        break;
    }
  }

  public renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'Previous'}
        />
      </View>
    );
  }

  public renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'Next'}
        />
      </View>
    );
  }

  public renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          title={'Finished'}
          onPress={onPress}
          disabled={!enabled}
          color={GREEN}
        />
      </View>
    );
  }

  public renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? GREEN : PURPLE}
          style={isSelected ? { fontWeight: 'bold' } : {}}
          key={`button_${index}`}
        />
      </View>
    );
  }

  public renderQuestionText(questionText) {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  public renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType='done'
        />
      </View>
    );
  }

  public renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput
        style={styles.numericInput}
        onChangeText={(text) => {
          onChange(text);
        }}
        underlineColorAndroid={'white'}
        placeholderTextColor={'rgba(184,184,184,1)'}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={'numeric'}
        onBlur={onBlur}
        maxLength={3}
      />
    );
  }

  public renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <SimpleSurvey
            ref={(s) => (this.surveyRef = s)}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 'auto',
              marginBottom: 30
            }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    width: 'auto',
    marginHorizontal: 10
  },
  contentContainer: {
    flex: 1
  },
  surveyContainer: {
    width: 'auto',
    alignSelf: 'center',
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
    paddingVertical: 30
  },
  selectionGroupContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'flex-end'
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10
  }
});
