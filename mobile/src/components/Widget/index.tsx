import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedbackTypesKeys = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackTypeKey, setFeedbackTypeKey] =
    useState<FeedbackTypesKeys | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function restartFeedbackForm() {
    setFeedbackTypeKey(null);
    setFeedbackSent(false);
  }

  function sendFeedback() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success restartFeedbackForm={restartFeedbackForm} />
        ) : (
          <>
            {feedbackTypeKey ? (
              <Form
                feedbackTypeKey={feedbackTypeKey}
                onFeedbackCancelled={restartFeedbackForm}
                onFeedbackSent={sendFeedback}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackTypeKey} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
