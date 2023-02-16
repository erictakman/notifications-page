"use strict";
class NotificationElement {
    constructor(user, profileImage, content, date, image, imageAlt, message, unread) {
        this.subject = "followed";
        this.unread = true;
        this.generateSubject = () => {
            if (this.content.indexOf("post") !== -1) {
                this.subject = "post";
            }
            else if (this.content.indexOf("group") !== -1) {
                this.subject = "group";
            }
            else if (this.content.indexOf("message") !== -1) {
                this.subject = "message";
            }
            else if (this.content.indexOf("picture") !== -1) {
                this.subject = "picture";
            }
        };
        this.createElement = (elementType, classList, innerHtml) => {
            const element = document.createElement(elementType);
            if (innerHtml != null)
                element.innerHTML = innerHtml;
            element.classList.add(classList);
            return element;
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
            this.appendImage(this.profileImage, `Image of ${this.user}`, "notification-profile-image");
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
            const user = this.createElement("span", "notification-user", this.user + " ");
            const content = this.createElement("p", "notification-content", this.content);
            const date = this.createElement("p", "notification-date", this.date);
            content.insertAdjacentElement("afterbegin", user);
            this.appendProfileImage();
            this.notificationElement.appendChild(content);
            this.notificationElement.appendChild(date);
            if (this.subject === "post") {
                const post = this.content.split("post ", 2)[1];
                content.innerHTML = content.innerHTML.replace(post, `<a href='#'><b>${post}</b></a>`);
            }
            if (this.subject === "group") {
                const group = this.content.split("group ", 2)[1];
                content.innerHTML = content.innerHTML.replace(group, `<a href='#'><b>${group}</b></a>`);
            }
            if (this.unread) {
                this.notificationElement.classList.add("notification-unread");
                const unread = this.createElement("span", "notification-unread-indicator-dot", " ");
                content.insertAdjacentElement("beforeend", unread);
            }
            if (this.subject === "message")
                this.appendMessage();
            if (this.subject === "picture")
                this.appendPostImage();
        };
        this.getNotificationElement = () => { return this.notificationElement; };
        this.user = user;
        this.profileImage = profileImage;
        this.content = content;
        this.date = date;
        this.image = image;
        this.imageAlt = imageAlt;
        this.message = message;
        this.unread = unread;
        this.notificationElement = this.createElement("div", "notification");
        this.generateSubject();
        this.assembleNotification();
    }
}
