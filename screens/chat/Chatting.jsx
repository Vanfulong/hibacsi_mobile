import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants/theme";
import { HeightSpacer, LoadingModal } from "../../components";
import axiosClients from "../../helper/axiosClients";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import axiosAI from "../../helper/axiosAI";
import { API_OPENAI } from '@env';
const Chatting = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const img = require("../../assets/images/chat-bot.png");
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Xin chào, tôi có thể giúp gì cho bạn",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot AI",
          avatar: img,
        },
      },
    ]);
  }, []);

  const getDataApi = async (messages) => {
    try {
      setIsTyping(true);
      // const resultGpt2 = await axiosAI.post(
      //   `${API_CHATBOT}gpt2`,
      //   {
      //     question: messages,
      //   }
      // );
      // setMessages((previousMessages) =>
      //   GiftedChat.append(previousMessages, {
      //     _id: getRandomInt(1000000000000,2000000000000),
      //     text: resultGpt2.answer,
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: "Chatbot AI",
      //       avatar: img,
      //     },
      //   })
      // );
      // const resultT5 = await axiosAI.post(
      //   `${API_CHATBOT}t5`,
      //   {
      //     question: messages,
      //   }
      // );
      // setMessages((previousMessages) =>
      //   GiftedChat.append(previousMessages, {
      //     _id: getRandomInt(1000000000000,2000000000000),
      //     text: resultT5.answer,
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: "Chatbot AI",
      //       avatar: img,
      //     },
      //   })
      // );

      const resultsGpt3 = await axiosAI.post(API_OPENAI,{
        model:"gpt-3.5-turbo-1106",
        messages: [
            {
            role: "user",
            content: messages
            }
        ],
        max_tokens: 500
      })
      const text = resultsGpt3.choices[0].message['content']
      console.log(text)
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: getRandomInt(1000000000000,2000000000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Chatbot AI",
            avatar: img,
          },
        })
      );
      setIsTyping(false);



      
    } catch (error) {
      setIsTyping(false);
      console.log(error);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: getRandomInt(1000000000000,2000000000000),
          text: "Có lỗi xảy ra, vui lòng thử lại sau",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Chatbot AI",
            avatar: img,
          },
        })
      );
    }
  };

  const onSend = useCallback((messages = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    getDataApi(messages[0].text);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Appbar.Header
        style={{
          backgroundColor: "white",
        }}
        statusBarHeight={0}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
          size={16}
        />
        <Text style={styles.title}>Bác sĩ AI</Text>
      </Appbar.Header>

      <GiftedChat
        isTyping={isTyping}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        textInputStyle={{ fontFamily: "regular", fontSize: SIZES.xmedium }}
        placeholder="Nhập câu hỏi..."
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={{
              width: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="send" size={24} color={COLORS.blue} />
          </Send>
        )}
      />

      <HeightSpacer height={20} />
    </SafeAreaView>
  );
};

export default Chatting;
const styles = StyleSheet.create({
  backIcon: {
    borderRadius: 50,
    marginRight: 10,
    borderColor: COLORS.gray,
    borderWidth: 0.3,
  },
  title: {
    color: COLORS.dark,
    fontSize: SIZES.medium,
    fontFamily: "medium",
  },
});
