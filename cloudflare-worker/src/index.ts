import { handleUsers } from "./endpoints/users";
import { handleLists } from "./endpoints/lists";
import { handleShareList } from "./endpoints/share-list";

addEventListener("fetch", async event => {
	const { pathname } = new URL(event.request.url);

	switch(pathname) {
		case "/users":
			event.respondWith(handleUsers(event.request));
			break;
		case "/lists":
			event.respondWith(handleLists(event.request));
			break;
		case "/share-list":
			event.respondWith(handleShareList(event.request));
			break;
		default:
			event.respondWith(new Response(null, { status: 404 }));
	}
});

