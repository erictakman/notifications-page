type MessageType = "post" | "group" | "message" | "picture" | "followed";

interface INotification {
	user: string;
	userName: string;
	profileImage: string;
	content: string;
	date: string;
	postUrl?: string;
	groupUrl?: string;
	image?: string;
	imageAlt?: string;
	imageUrl?: string;
	message?: string;
	unread?: boolean;
}

class NotificationElement {

	private notificationElement: Element;
	private messageType: MessageType = "followed";
	private user: string;
	private userName: string;
	private profileImage: string;
	private content: string;
	private date: string;
	private postUrl?: string;
	private groupUrl?: string;
	private image?: string;
	private imageAlt?: string;
	private imageUrl?: string;
	private message?: string;
	private unread: boolean = true;

	constructor(
		user: string,
		userName: string,
		profileImage: string,
		content: string,
		date: string,
		postUrl?: string,
		groupUrl?: string,
		image?: string,
		imageAlt?: string,
		imageUrl?: string,
		message?: string,
		unread?: boolean
	) {
		this.user = user;
		this.userName = userName;
		this.profileImage = profileImage;
		this.content = content;
		this.date = date;
		this.image = image;
		this.imageAlt = imageAlt;
		this.message = message;
		this.unread = unread!;
		this.notificationElement = this.createElement("div", "notification");

		this.generateSubject();
		this.assembleNotification();
	}

	private generateSubject = () => {
		if (this.content.indexOf("post") !== -1) {
			this.messageType = "post";
		} else if (this.content.indexOf("group") !== -1) {
			this.messageType = "group";
		} else if (this.content.indexOf("message") !== -1) {
			this.messageType = "message";
		} else if (this.content.indexOf("picture") !== -1) {
			this.messageType = "picture";
		}
	}

	private createElement = (elementType: string, classList: string, innerHtml?: string): Element => {
		const element = document.createElement(elementType);
		if (innerHtml != null) element.innerHTML = innerHtml;
		element.classList.add(classList);
		return element;
	}

	private appendLink = (
		notificationElement: Element,
		text: string,
		place: "beforeend" | "afterbegin",
		element: string,
		classList: string
	) => {
		notificationElement.innerHTML = notificationElement.innerHTML.replace(text, "");
		const a = this.createElement(element, classList, text);
		a.setAttribute("href", this.postUrl ?? "#");
		notificationElement.insertAdjacentElement(place, a)
	}

	private appendMessage = () => {
		const message = this.createElement("p", "notification-message", this.message!);
		this.notificationElement.appendChild(message);
	}

	private appendPostImage = () => {
		this.appendImage(this.image!, this.imageAlt ?? "Notification image", "notification-image");
	}

	private appendProfileImage = () => {
		this.appendImage(this.profileImage, `Image of ${this.userName}`, "notification-profile-image");
	}

	private appendImage = (source: string, alt: string, classList: string) => {
		if (source === undefined) return;
		const image = this.createElement("img", classList);
		image.setAttribute("src", `./assets/images/${source}`);
		image.setAttribute("alt", alt);
		this.notificationElement.appendChild(image);
	}

	public assembleNotification = () => {
		const content = this.createElement("p", "notification-content", this.content);
		const date = this.createElement("p", "notification-date", this.date);

		this.appendLink(content, `${this.userName} `, "afterbegin", "a", "notification-user");

		this.appendProfileImage();
		this.notificationElement.appendChild(content);
		this.notificationElement.appendChild(date);

		if (this.messageType === "post") {
			const post = this.content.split("post ", 2)[1];
			this.appendLink(content, post, "beforeend", "a", "notification-content-post")
		}

		if (this.messageType === "group") {
			const group = this.content.split("group ", 2)[1];
			this.appendLink(content, group, "beforeend", "a", "notification-content-group")
		}

		if (this.unread) {
			this.notificationElement.classList.add("notification-unread");
			const unread = this.createElement("span", "notification-unread-indicator-dot");
			content.insertAdjacentElement("beforeend", unread);
		}

		if (this.messageType === "message") this.appendMessage();

		if (this.messageType === "picture") this.appendPostImage();

	}

	public getNotificationElement = (): Element => { return this.notificationElement; }

}
