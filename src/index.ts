const notifications: NotificationElement[] = [];

const data = async () => {
	return await fetch("../assets/data/notifications.json")
		.then((response) => response.json())
}

data().then((data: INotification[]) => {
	data.forEach((notification: INotification) => {
		notifications.push(new NotificationElement(
			notification.user,
			notification.profileImage,
			notification.content,
			notification.date,
			notification.image,
			notification.imageAlt,
			notification.message,
			notification.unread
		));
	});
	notifications.forEach(notification => {
		document.querySelector("main")!.appendChild(notification.getNotificationElement());
	})
})

console.log(notifications);