"use strict";
const notifications = [];
let unreadCounter = 0;
notificationData.forEach((notification) => {
    notifications.push(new NotificationElement(notification.user, notification.userName, notification.profileImage, notification.content, notification.date, notification.postUrl, notification.groupUrl, notification.image, notification.imageAlt, notification.imageUrl, notification.message, notification.unread));
    if (notification.unread)
        unreadCounter++;
});
document.getElementById("unread-counter").innerHTML = unreadCounter.toString();
notifications.forEach(notification => {
    document.querySelector("main").appendChild(notification.getNotificationElement());
});
document.getElementById("mark-all-as-read").addEventListener("click", () => {
    console.log("clicked");
    notifications.forEach(notification => {
        notification.setNotificationReadState(false);
        unreadCounter = 0;
        document.getElementById("unread-counter").innerHTML = unreadCounter.toString();
        document.getElementById("unread-counter").style.display = "none";
    });
});
