"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const notifications = [];
const data = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch("../assets/data/notifications.json")
        .then((response) => response.json());
});
data().then((data) => {
    data.forEach((notification) => {
        notifications.push(new NotificationElement(notification.user, notification.profileImage, notification.content, notification.date, notification.image, notification.imageAlt, notification.message, notification.unread));
    });
    notifications.forEach(notification => {
        document.querySelector("main").appendChild(notification.getNotificationElement());
    });
});
console.log(notifications);
