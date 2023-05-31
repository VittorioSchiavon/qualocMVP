import styles from "./Message.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Message = ({ message, own }) => {
  console.log("message is mine? ", own)
  var date = new Date(message.createdAt);  // dateStr you get from mongodb
var d = date.getDate();
var m = date.getMonth()+1
var h = date.getHours()
var min = date.getMinutes()
  return  (
    <div className={own ? styles.myMessage: styles.message}>
      <div className={styles.messageTop}>
        <div className={styles.messageImg}>
          j
          </div>
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{d + "/"+ m + " "+ h + ":" + min}</div>
    </div>
  );
};

export default Message;