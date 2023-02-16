export type Subject = "post" | "group" | "message" | "picture";

export default class Notification {

	private notificationElement: Element;
	private user: string;
	private profileImage: string;
	private content: string;
	private date: string;
	private subject: Subject;
	private image?: string;
	private imageAlt?: string;
	private message?: string;
	private unread: boolean = true;

	constructor(
		user: string,
		profileImage: string,
		content: string,
		date: string,
		image?: string,
		imageAlt?: string,
		message?: string,
		unread?: boolean
	) {
		this.user = user;
		this.profileImage = profileImage;
		this.content = content;
		this.date = date;
		this.image = image;
		this.imageAlt = imageAlt;
		this.message = message;
		this.unread = unread!;

		this.generateSubject();
	}

	private generateSubject = () => {
		if (this.content.includes("post")) {
			this.subject = "post";
		} else if (this.content.includes("group")) {
			this.subject = "group";
		} else if (this.content.includes("message")) {
			this.subject = "message";
		} else if (this.content.includes("picture")) {
			this.subject = "picture";
		}
	}

	private createElement = (elementType: string, classList: string, innerHtml?: string): Element => {
		let element = document.createElement(elementType);
		if (innerHtml != null) element.innerHTML = innerHtml;
		element.classList.add(classList);
		return element;
	}

	private appendMessage = () => {
		let message = this.createElement("p", "notification-message", this.message!);
		this.notificationElement.appendChild(message);
	}

	private appendImage = (profileImage: boolean, classList) => {
		let image = this.createElement("img", classList);
		if (!profileImage) {
			image.setAttribute("src", this.image!);
			image.setAttribute("alt", "Notification image");
			this.notificationElement.appendChild(image);
		} else {
			image.setAttribute("src", this.profileImage);
			image.setAttribute("alt", `Image of ${this.user}`);
		}
	}

	public assembleNotification = () => {
		this.notificationElement = this.createElement("div", "notification");
		let user = this.createElement("span", "notification-user", this.user);
		let profileImageElement = this.createElement("img", "notification-profile-image");
		let content = this.createElement("p", "notification-content", this.content);
		let date = this.createElement("p", "notification-date", this.date);

		content.innerHTML = user + " " + content.innerHTML;

		if (this.subject === "post") {
				let post = this.content.substring(this.content.split(" ").indexOf("post") + 1, this.content.length);
				content.innerHTML = content.innerHTML.replace(post, "<a href='#'><b>" + post + "</b></a>");
		}
		if (this.subject === "group") {
				let group = this.content.substring(this.content.split(" ").indexOf("group") + 1, this.content.length);
				content.innerHTML = content.innerHTML.replace(group, "<a href='#'><b>" + group + "</b></a>");
		}

		if (this.unread) {
			this.notificationElement.classList.add("notification-unread");
			let unread = this.createElement("span", "notification-unread-indicator-dot");
			content.innerHTML = content.innerHTML + " " + unread;
		}

		this.notificationElement.appendChild(profileImageElement);
		this.notificationElement.appendChild(content);
		this.notificationElement.appendChild(date);

		if (this.subject === "message") this.appendMessage();
		if (this.subject === "picture") this.appendImage(false, "notification-image");

	}

	public getNotificationElement = (): Element => { return this.notificationElement; }

}
