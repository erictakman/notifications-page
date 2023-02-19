"use strict";
class NotificationElement {
    constructor(user, userName, profileImage, content, date, postUrl, groupUrl, image, imageAlt, imageUrl, message, unread) {
        this.messageType = "followed";
        this.unread = true;
        this.generateSubject = () => {
            if (this.content.indexOf("post") !== -1) {
                this.messageType = "post";
            }
            else if (this.content.indexOf("group") !== -1) {
                this.messageType = "group";
            }
            else if (this.content.indexOf("message") !== -1) {
                this.messageType = "message";
            }
            else if (this.content.indexOf("picture") !== -1) {
                this.messageType = "picture";
            }
        };
        this.createElement = (elementType, classList, innerHtml) => {
            const element = document.createElement(elementType);
            if (innerHtml != null)
                element.innerHTML = innerHtml;
            element.classList.add(classList);
            return element;
        };
        this.appendLink = (notificationElement, text, place, element, classList) => {
            var _a;
            notificationElement.innerHTML = notificationElement.innerHTML.replace(text, "");
            const a = this.createElement(element, classList, text);
            a.setAttribute("href", (_a = this.postUrl) !== null && _a !== void 0 ? _a : "#");
            notificationElement.insertAdjacentElement(place, a);
        };
        this.appendMessage = () => {
            const message = this.createElement("p", "notification-message", this.message);
            this.notificationElement.appendChild(message);
        };
        this.appendPostImage = () => {
            var _a;
            this.appendImage(this.image, (_a = this.imageAlt) !== null && _a !== void 0 ? _a : "Notification image", "notification-image");
        };
        this.appendProfileImage = () => {
            this.appendImage(this.profileImage, `Image of ${this.userName}`, "notification-profile-image");
        };
        this.appendImage = (source, alt, classList) => {
            if (source === undefined)
                return;
            const image = this.createElement("img", classList);
            image.setAttribute("src", `./assets/images/${source}`);
            image.setAttribute("alt", alt);
            this.notificationElement.appendChild(image);
        };
        this.assembleNotification = () => {
            const date = this.createElement("p", "notification-date", this.date);
            this.appendLink(this.contentElement, `${this.userName} `, "afterbegin", "a", "notification-user");
            this.appendProfileImage();
            this.notificationElement.appendChild(this.contentElement);
            this.notificationElement.appendChild(date);
            if (this.messageType === "post") {
                const post = this.content.split("post ", 2)[1];
                this.appendLink(this.contentElement, post, "beforeend", "a", "notification-content-post");
            }
            if (this.messageType === "group") {
                const group = this.content.split("group ", 2)[1];
                this.appendLink(this.contentElement, group, "beforeend", "a", "notification-content-group");
            }
            if (this.unread) {
                this.notificationElement.classList.add("notification-unread");
                const unread = this.createElement("span", "notification-unread-indicator-dot");
                this.contentElement.insertAdjacentElement("beforeend", unread);
            }
            if (this.messageType === "message")
                this.appendMessage();
            if (this.messageType === "picture")
                this.appendPostImage();
        };
        this.getNotificationElement = () => { return this.notificationElement; };
        this.setNotificationReadState = (state) => {
            if (state === this.unread)
                return;
            this.unread = state;
            if (state) {
                this.notificationElement.classList.add("notification-unread");
                const unread = this.createElement("span", "notification-unread-indicator-dot");
                this.contentElement.insertAdjacentElement("beforeend", unread);
            }
            else {
                this.notificationElement.classList.remove("notification-unread");
                this.contentElement.removeChild(this.contentElement.lastChild);
            }
        };
        this.user = user;
        this.userName = userName;
        this.profileImage = profileImage;
        this.content = content;
        this.date = date;
        this.image = image;
        this.imageAlt = imageAlt;
        this.message = message;
        this.unread = unread;
        this.notificationElement = this.createElement("div", "notification");
        this.contentElement = this.createElement("p", "notification-content", this.content);
        this.generateSubject();
        this.assembleNotification();
    }
}
