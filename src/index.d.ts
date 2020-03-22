declare module 'react-native-simple-survey' {
  export interface Info {
    questionType: 'Info';
    questionText: string | object;
  }

  export interface TextInput {
    questionType: 'TextInput';
    questionText: string | object;
    questionId: string;
    placeholderText?: string;
    defaultValue?: string;
  }

  export interface NumericInput {
    questionType: 'NumericInput';
    questionText: string | object;
    questionId: string;
    placeholderText?: string | number;
    defaultValue?: string | number;
  }

  export interface SelectionGroupOption {
    optionText: string;
    value: any;
  }

  export interface SelectionGroup {
    questionType: 'SelectionGroup';
    questionText: string | object;
    questionId: string;
    questionSettings?: {
      autoAdvance?: boolean;
      allowDeselection?: boolean;
      defaultSelection?: number;
    };
    options: SelectionGroupOption[];
  }

  export interface MultipleSelectionGroup {
    questionType: 'MultipleSelectionGroup';
    questionText: string | object;
    questionId: string;
    questionSettings?: {
      autoAdvance?: boolean;
      allowDeselection?: boolean;
      maxMultiSelect?: number;
      minMultiSelect?: number;
      defaultSelection?: Array<number>;
    };
    options: SelectionGroupOption[];
  }
}
