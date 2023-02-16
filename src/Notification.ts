type Subject = "post" | "group" | "message" | "picture" | "followed";

interface INotification {
	user: string;
	profileImage: string;
	content: string;
	date: string;
	image?: string;
	imageAlt?: string;
	message?: string;
	unread?: boolean;
}

class NotificationElement {

	private notificationElement: Element;
	private user: string;
	private profileImage: string;
	private content: string;
	private date: string;
	private subject: Subject = "followed";
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
		this.notificationElement = this.createElement("div", "notification");

		this.generateSubject();
		this.assembleNotification();
	}

	private generateSubject = () => {
		if (this.content.indexOf("post") !== -1) {
			this.subject = "post";
		} else if (this.content.indexOf("group") !== -1) {
			this.subject = "group";
		} else if (this.content.indexOf("message") !== -1) {
			this.subject = "message";
		} else if (this.content.indexOf("picture") !== -1) {
			this.subject = "picture";
		}
	}

	private createElement = (elementType: string, classList: string, innerHtml?: string): Element => {
		const element = document.createElement(elementType);
		if (innerHtml != null) element.innerHTML = innerHtml;
		element.classList.add(classList);
		return element;
	}

	private appendMessage = () => {
		const message = this.createElement("p", "notification-message", this.message!);
		this.notificationElement.appendChild(message);
	}

	private appendPostImage = () => {
		this.appendImage(this.image!, this.imageAlt ?? "Notification image", "notification-image");
	}

	private appendProfileImage = () => {
		this.appendImage(this.profileImage, `Image of ${this.user}`, "notification-profile-image");
	}

	private appendImage = (source: string, alt: string, classList: string) => { 
		if (source === undefined) return;
		const image = this.createElement("img", classList);
		image.setAttribute("src", `./assets/images/${source}`);
		image.setAttribute("alt", alt);
		this.notificationElement.appendChild(image);
	}

	public assembleNotification = () => {
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
		
		if (this.subject === "message") this.appendMessage();
		
		if (this.subject === "picture") this.appendPostImage();

		

	}

	public getNotificationElement = (): Element => { return this.notificationElement; }

}
