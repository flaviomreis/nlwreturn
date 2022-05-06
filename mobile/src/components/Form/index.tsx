import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackTypesKeys } from '../Widget';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { api } from '../../lib/api';

interface Props {
  feedbackTypeKey: FeedbackTypesKeys;
  onFeedbackCancelled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackTypeKey,
  onFeedbackCancelled,
  onFeedbackSent,
}: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const feedbackTypeInfo = feedbackTypes[feedbackTypeKey];
  const [isSendingFeedback, setSendingFeedback] = useState(false);
  const [comment, setComment] = useState('');

  function takeShot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  }

  function removeShot() {
    setScreenshot(null);
  }

  async function sendFeedback() {
    if (isSendingFeedback) {
      return;
    }

    setSendingFeedback(true);

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }));

    try {
      await api.post('/feedbacks', {
        type: feedbackTypeKey,
        comment,
        screenshot: screenshotBase64
          ? `data:image/png;base64,${screenshotBase64}`
          : null,
      });

      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancelled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.commentInput}
        placeholder="Conte com detalhes o que está acontecendo."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={takeShot}
          onRemoveShot={removeShot}
          screenshot={screenshot}
        />
        <Button isLoading={isSendingFeedback} onPress={sendFeedback} />
      </View>
    </View>
  );
}
