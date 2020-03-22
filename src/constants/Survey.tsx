import {
  TextInput,
  Info,
  NumericInput,
  SelectionGroup,
  MultipleSelectionGroup
} from 'react-native-simple-survey';

export const survey: Array<
  Info | TextInput | NumericInput | SelectionGroup | MultipleSelectionGroup
> = [
  {
    questionType: 'Info',
    questionText: `
    The healthcare systems are crowded.
    This questionnaire will help you assess your severity.
  `
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Where are you right now?',
    questionId: 'locationPreference',
    questionSettings: {
      allowDeselection: false
    },
    options: [
      {
        optionText: `Take my location`,
        value: 'option 2'
      },
      {
        optionText: `I don't know, but I am travelling to a known place`,
        value: 'option 1'
      },
      {
        optionText: `Can't tell`,
        value: 'option 3'
      }
    ]
  },
  {
    questionType: 'MultipleSelectionGroup',
    questionText: `
    Right now, which are you experiencing?
    Select the most severe 3.
    `,
    questionId: 'currentSymptoms',
    questionSettings: {
      maxMultiSelect: 3,
      minMultiSelect: 1
    },
    options: [
      {
        optionText: 'Fever',
        value: 'fever'
      },
      {
        optionText: 'Difficult breathing',
        value: 'difficult breathing'
      },
      {
        optionText: 'Slight cough',
        value: 'slight cough'
      },
      {
        optionText: 'Severe cough',
        value: 'severe cough'
      },
      {
        optionText: 'None of the above',
        value: 'none severe'
      }
    ]
  },
  {
    questionType: 'NumericInput',
    questionText: 'What is your age?',
    questionId: 'age',
    placeholderText: '(number)'
  },
  {
    questionType: 'TextInput',
    questionText:
      'Simple Survey supports free form text input.\n\nWhat is your favorite color?',
    questionId: 'favoriteColor',
    placeholderText: 'Tell me your favorite color!'
  },

  {
    questionType: 'NumericInput',
    questionText:
      'New to 3.0, default values!\n\nHow many balls can you juggle at once?',
    questionId: 'jugglingBalls',
    defaultValue: '0'
  },
  {
    questionType: 'SelectionGroup',
    questionText:
      'Naturally Simple Survey also has multiple choice questions. By default they acts like checkboxes, answers can be selected and deselected.\n\nWhat is your favorite pet?',
    questionId: 'favoritePet',
    options: [
      {
        optionText: 'Dogs',
        value: 'dog'
      },
      {
        optionText: 'Cats',
        value: 'cat'
      },
      {
        optionText: 'Ferrets',
        value: 'ferret'
      },
      {
        optionText: 'Snakes',
        value: 'snake'
      },
      {
        optionText: 'Guinea pigs',
        value: 'guinea'
      }
    ]
  },

  {
    questionType: 'MultipleSelectionGroup',
    questionText:
      'Simple Survey can auto advance after a question has been answered. Select two things you do to relax:',
    questionId: 'relax',
    questionSettings: {
      maxMultiSelect: 2,
      minMultiSelect: 2,
      autoAdvance: true
    },
    options: [
      {
        optionText: 'Reading a good book',
        value: 'reading'
      },
      {
        optionText: 'Going on vacation',
        value: 'vacations'
      },
      {
        optionText: 'Eating meals with family',
        value: 'meals'
      },
      {
        optionText: 'Heading to the ocean',
        value: 'ocean'
      }
    ]
  },

  {
    questionType: 'SelectionGroup',
    questionText: 'Simple Survey also supports default selections: ',
    questionId: 'singleDefault',
    questionSettings: {
      defaultSelection: 0
    },
    options: [
      {
        optionText: 'This is the default option',
        value: 'default'
      },
      {
        optionText: 'This is the alternative option',
        value: 'alternative'
      }
    ]
  },
  {
    questionType: 'MultipleSelectionGroup',
    questionText: 'And of course it supports multiple defaults: ',
    questionId: 'multipleDefaults',
    questionSettings: {
      defaultSelection: [0, 2],
      maxMultiSelect: 2,
      minMultiSelect: 2
    },
    options: [
      {
        optionText: 'This is the first default option',
        value: 'first default'
      },
      {
        optionText: 'This is the first alternate option',
        value: 'first alternative'
      },
      {
        optionText: 'This is the second default option',
        value: 'second default'
      },
      {
        optionText: 'This is the second alternate option',
        value: 'second alternative'
      }
    ]
  },
  {
    questionType: 'Info',
    questionText: 'That is all for the demo, tap finish to see your results!'
  }
];
