const notifications: NotificationElement[] = [];
let unreadCounter: number = 0;

const data = async () => {
	return await fetch("../assets/data/notifications.json")
		.then((response) => response.json());
}

data().then((data: INotification[]) => {
	data.forEach((notification: INotification) => {
		notifications.push(new NotificationElement(
			notification.user,
			notification.userName,
			notification.profileImage,
			notification.content,
			notification.date,
			notification.postUrl,
			notification.groupUrl,
			notification.image,
			notification.imageAlt,
			notification.imageUrl,
			notification.message,
			notification.unread
		));
	
		if (notification.unread) unreadCounter++;
	
	});
	
	document.querySelector("#unread-counter")!.innerHTML = unreadCounter.toString();

	notifications.forEach(notification => {
		document.querySelector("main")!.appendChild(notification.getNotificationElement());
	});

});